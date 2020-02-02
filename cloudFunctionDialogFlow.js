// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
admin.initializeApp({
	credential : admin.credential.applicationDefault(),
  	databaseURL: 'ws://heretostay-267008.firebaseio.com/'
});
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
var db = admin.database();
var dbRef = db.ref("caseHistory");
var result = {};

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {

  }
 
  function fallback(agent) {
    
  }
  
  function handleLanguage(agent){
    const lang = agent.parameters.language;
	result.language = lang;
  }  
  function handleA_number(agent){
    const A_number = agent.parameters.a_number;
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
  function handleDateOfBirth(agent){
    result.DOB = agent.parameters.dateOfBirth;
  }
  function handleLocation(agent){
    const Location = agent.parameters;
	result.Location = Location['geo-city'];
  }
  function handleEntryDateTime(agent){
	const DateTimeEntry = agent.parameters;
    result.EntryDateTime = DateTimeEntry['date-time'];
  }  
  function handleManner(agent){
    result.manner = agent.parameters.manner;
    return dbRef.push(result);
  }
  

  
  let intentMap = new Map();
  //intentMap.set('Default Welcome Intent', welcome);
  //intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Language', handleLanguage);
  intentMap.set('A_number', handleA_number);
  intentMap.set('Name', handleName);
  intentMap.set('Country', handleCountry);
  intentMap.set('DateOfBirth', handleDateOfBirth);
  intentMap.set('Location', handleLocation); 
  intentMap.set('EntryDateTime', handleEntryDateTime);
  intentMap.set('Manner', handleManner);
  
  agent.handleRequest(intentMap);
});
