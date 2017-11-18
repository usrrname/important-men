const express = require('express');
const bodyParser = require('body-parser');
const dB = require('./mongo');
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

app.get('/', (req, res) => {
  res.send('hello hello');
});

// hook router into express route
app.use('/questions', questionsRouter);
dB.start();

app.listen(PORT);
