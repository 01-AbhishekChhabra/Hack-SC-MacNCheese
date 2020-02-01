'use strict';

const config = require('./config.json');
const twilio = require('twilio');

const VoiceResponse = twilio.twiml.VoiceResponse;

const projectId = 'hacksc-266917';
const region = 'us-central1';

// Receiving a phone call

exports.handleCall = (req, res) => {
    if (!isValidRequest(req, res, 'handleCall')) {
        return;
    }

    const recordingStatusCallbackUrl = `https://${region}-${projectId}.cloudfunctions.net/getRecording`;
    console.log('recordingStatusCallback URL')
    console.log(recordingStatusCallbackUrl)
    // Prepare a response to the voice call
    const response = new VoiceResponse();

    // Prompt the user to leave a message
    response.say('Hello from Cloud Functions. Please leave a message after the beep.');

    console.log('Recording message.');

    // Record the user's message
    response.record({
        // Limit the recording to 60 seconds
        maxLength: 60,
        // Give Twilio the deployed url of the other function for when the recorded
        // audio is available
        recordingStatusCallback: recordingStatusCallbackUrl
    });

    // End the call
    response.hangup();

    // Send the response
    res
        .status(200)
        .type('text/xml')
        .send(response.toString())
        .end();
};

// Validating the request

function isValidRequest(req, res, pathname) {
    let isValid = true;

    // Only validate that requests came from Twilio when the function has been
    // deployed to production.
    // if (process.env.NODE_ENV === 'production') {
    //     isValid = twilio.validateExpressRequest(req, config.TWILIO_AUTH_TOKEN, {
    //         url: `https://${region}-${projectId}.cloudfunctions.net/${pathname}`
    //     });
    // }

    isValid = twilio.validateExpressRequest(req, config.TWILIO_AUTH_TOKEN, {
                url: `https://${region}-${projectId}.cloudfunctions.net/${pathname}`
            });

    // Halt early if the request was not sent from Twilio
    if (!isValid) {
        res
            .type('text/plain')
            .status(403)
            .send('Twilio Request Validation Failed.')
            .end();
    }

    return isValid;
}


//   Retrieving the recording
exports.getRecording = (req, res) => {
    if (!isValidRequest(req, res, 'getRecording')) {
        return;
    }

    const got = require('got');
    const path = require('path');
    const { Storage } = require('@google-cloud/storage');
    const storage = new Storage();

    const filename = `recordings/${path.parse(req.body.RecordingUrl).name}/audio.wav`;
    const file = storage
        .bucket(config.RESULTS_BUCKET)
        .file(filename);

    console.log(`Saving recording to: ${filename}`);

    got.stream(req.body.RecordingUrl)
        .pipe(file.createWriteStream({
            metadata: {
                contentType: 'audio/x-wav'
            }
        }))
        .on('error', (err) => {
            console.error(err);
            res
                .status(500)
                .send(err)
                .end();
        })
        .on('finish', () => {
            res
                .status(200)
                .end();
        });
};

// Analyzing the recording

exports.analyzeRecording = (event) => {
    const object = event.data;
  
    if (object.resourceState === 'not_exists') {
      // Ignore file deletions
      return true;
    } else if (!/^recordings\/\S+\/audio\.wav$/.test(object.name)) {
      // Ignore changes to non-audio files
      return true;
    }
  
    console.log(`Analyzing gs://${object.bucket}/${object.name}`);
  
    // Import the Google Cloud client libraries
    const language = require('@google-cloud/language').v1beta2;
    const speech = require('@google-cloud/speech');
    const storage = require('@google-cloud/storage')();
  
    const nlclient = new language.LanguageServiceClient();
    const spclient = new speech.SpeechClient();
    const bucket = storage.bucket(object.bucket);
    const dir = require('path').parse(object.name).dir;
  
    // Configure audio settings for Twilio voice recordings
    const audioConfig = {
      sampleRateHertz: 8000,
      encoding: 'LINEAR16',
      languageCode: 'en-US'
    };
  
    const audioPath = {
      uri: `gs://${object.bucket}/${object.name}`
    };
  
    const audioRequest = {
      audio: audioPath,
      config: audioConfig,
    };
  
    // Transcribe the audio file
    return spclient.recognize(audioRequest)
      // Perform Sentiment, Entity, and Syntax analysis on the transcription
      .then(data => { 
        const sresponse = data[0];
        const transcription = sresponse.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        return nlclient.analyzeSentiment({document: {content: `${transcription}`, type: 'PLAIN_TEXT'}});
      })
      // Finally, save the analysis
      .then(responses => {
        const filename = `${dir}/analysis.json`;
        console.log(`Saving gs://${object.bucket}/${dir}/${filename}`);
        return bucket
          .file(filename)
          .save(JSON.stringify(responses[0].documentSentiment, null, 1));
        });
  };