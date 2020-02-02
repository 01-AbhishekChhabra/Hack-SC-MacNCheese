// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
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
  }
  function handleName(agent){
    const name = agent.parameters;
    result.name = name;
  }
  function handleCountry(agent){
    const country_of_residence = agent.parameters;
    result.country = country_of_residence['geo-country'];
  }
  function handleDOB(agent){
    result.dateOfBirth = agent.parameters;
  }
  function handleDC(agent){
    result.detentionCenter = agent.parameters;
  }
  function handleUS_Entry(agent){
    result.dateOfUsEntry = agent.parameters;
  }
  function handleUS_manner(agent){
    result.mannerOfEntry = agent.parameters;
  }
  function handlePOC(agent){
    result.pointOfContactName = agent.parameters;
  }
  function handleLocation_A(agent){
    result.apprehensionLocation = agent.parameters;
  }
  function handleCrime_History(agent){
    result.crimeHistory = agent.parameters;
  }
  function handleAfraid(agent){
    result.afraidQuestion = agent.parameters;
  }
  function handleAdditional_Info(agent){
    result.additionalInfo = agent.parameters;
    var dbRef = admin.database().child("caseStudies");
    var dbRefPost = dbRef.push();
    return dbRefPost.set({
      result
     });
  }
  
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Language', handleLanguage);
  intentMap.set('A_number', handleA_number);
  intentMap.set('Name', handleName);
  intentMap.set('Country', handleCountry);
  intentMap.set('DOB', handleDOB);
  intentMap.set('DC', handleDC);
  intentMap.set('US_Entry', handleUS_Entry);
  intentMap.set('US_manner', handleUS_manner);
  intentMap.set('POC', handlePOC);
  intentMap.set('Location_A', handleLocation_A);
  intentMap.set('Crime_History', handleCrime_History);
  intentMap.set('Afraid', handleAfraid);
  intentMap.set('Additional_Info', handleAdditional_Info);
  
  
  agent.handleRequest(intentMap);
});
