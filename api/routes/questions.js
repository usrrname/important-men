//this file is questions/whatever-endpoint 

var express = require('express');
var dB = require('../mongo');
var questionsRouter = express.Router();
var bodyParser = require('body-parser');

//'questions/' endpoint hit when user selects to see all q+a
questionsRouter.get('/', (req, res) => {
  //res.send('send all the questions with responses here');
  res.json([{ "name": "john", "email":"john@jones.com", "comments": "Hey Girl?"},
  { "name": "alex", "email":"help@alex.com", "comments": "What is going on?"},
  { "name": "kate", "email":"k@lost.com", "comments": "Where is my hairbrush?"}
  ]);
});

questionsRouter.post('/ask', (req, res) => {
  console.log('question received');
  console.log(req.body);
  const db = dB.get();
  const collection = db.collection('questions');
  collection.insert(req.body, (err, result) => {
    if (err) {
      console.log(`err: ${err}`);
    } else {
      console.log('inserted');
      console.log(result);
    }
  });
  res.send('you sent a question');
});

module.exports = questionsRouter;
