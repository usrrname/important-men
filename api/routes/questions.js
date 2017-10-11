var express = require('express');
var dB = require('../mongo');
var questionsRouter = express.Router();

questionsRouter.get('/', (req, res) => {
  res.send('send all the questions with responses here');
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
