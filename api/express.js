var express = require('express');
var bodyParser = require('body-parser');
var dB = require('./mongo');
var app = express();
const path = require('path');
var questionsRouter = require('./routes/questions');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public/app')));

// respond with index -email form atm
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// hook router into express route
app.use('/questions', questionsRouter);
dB.start();

app.listen('3000');
