'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
admin.initializeApp({
	credential : admin.credential.applicationDefault(),
  	databaseURL: 'ws://imhelp.firebaseio.com/'
});
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
let result = {};
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  function handleLanguage(agent){
    const lang = agent.parameters.language;
    result.language = lang;
    console.log(result);
  }
  function handleA_number(agent){
    const A_number = agent.parameters.any;
    result.aNumber = A_number;
    console.log(result);
  }
  function handleName(agent){
    console.log(result);
    const name = agent.parameters;
    result.name = name;
    console.log(result);
  }
  function handleCountry(agent){
    const country_of_residence = agent.parameters;
    result.country = country_of_residence['geo-country'];
    console.log(result);
    var dbRef = admin.database().child("caseStudies");
    var dbRefPost = dbRef.push();
    return dbRefPost.set({
      result
     });
  }
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! :information_desk_person:`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }
  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Language', handleLanguage);
  intentMap.set('A_number', handleA_number);
  intentMap.set('Name', handleName);
  intentMap.set('Country', handleCountry);
  agent.handleRequest(intentMap);
});