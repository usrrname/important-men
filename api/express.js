var express = require('express');
var bodyParser = require('body-parser');
var dB = require('./mongo');
var app = express();

var questionsRouter = require('./routes/questions');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

questionsRouter.get('/', (req, res) => {
  res.send('send all the questions with responses here');
});

app.use('/questions', questionsRouter);

dB.start();

app.listen('3000');
