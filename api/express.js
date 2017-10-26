const express = require('express');
const bodyParser = require('body-parser');
const dB = require('./mongo');
const path = require('path');
const questionsRouter = require('./routes/questions');

const PORT = process.env.PORT || 3000;

const app = express();
app.set('port', PORT);

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
  res.sendFile(path.join(__dirname, '/index.html'));
});

// hook router into express route
app.use('/questions', questionsRouter);
dB.start();

app.listen(PORT);
