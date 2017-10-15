var express = require('express');
var bodyParser = require('body-parser');
var dB = require('./mongo');
var app = express();
var questionsRouter = require('./routes/questions');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

// hook router into express route
app.use('/questions', questionsRouter);

dB.start();

app.listen('3000');
