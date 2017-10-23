//this file is questions/whatever-endpoint 
const express = require('express');
const dB = require('../mongo');
const questionsRouter = express.Router();
const bodyParser = require('body-parser');

//for nodemailer & sendgrid
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const SENDGRID_API_KEY = require('../../sendgrid.env');
const config = require('../config');
const email = process.env.EMAIL || config.email;

//'questions/' endpoint hit when user selects to see all q+a
questionsRouter.get('/', (req, res) => {
  const db = dB.get();
  const collection = db.collection('questions');
  collection.find({}).toArray((err, resp) => {
    if (err) {
      throw err;
    }
    res.json(resp);
  });
});

questionsRouter.post('/ask', (req, res) => {
  console.log('question received');
  //console.log(req.body);
  const db = dB.get();
  const collection = db.collection('questions');
  collection.insert(req.body, (err, result) => {
    if (err) {
      console.log(`err: ${err}`);
    } else {
      console.log('inserted');
      console.log(result);
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: 'questions@importantmen.com',
        subject: 'Hello Matthew!',
        text: 'This is an email handled through SendGrid',
        html: `<p>You have a new question!</p>
              <h3>Contact Details<h/3>
              <ul>
              <li>Name: ${req.body.name}</li>
              <li>Email: ${req.body.email}</li>
              <li>(For Admin use) Mongo Obj ID ${req.body._id}</li>
              </ul>
              <h3>Message</h3>
              <p>${req.body.comment}</p>
              <br><hr><br>
              <h3>Respond in this form below</h3>
              <form id="res-form"  action="http://localhost:3000/questions/response/" method="post">
                <label>Subject Line</label><br>
                <input id='title' name='title' placeholder='subject line' type='text'><br>
                <label>Your Answer</label><br>
                <textarea id='advice' name='advice' type='text' placeholder='Enter Your Lovely Advice :)'></textarea><br>
                <div>
                  <input id="answerButton" type="submit" value="Submit">
                </div>
              </form>
      `,
      };
      sgMail.send(msg);
      return res.send('you sent a question + question handled by sendgrid');
    }
    return res.status;
  });
});

//'questions/response' endpoint hit when user selects to see all q+a
questionsRouter.get('/response', (req, res) => {
  const db = dB.get();
  const collection = db.collection('questions');
  try {
    collection.findOneAndUpdate(
      { '_id': { $eq: `${req.body._id}` } }, //query
      { $addToSet: { answerTitle: `${req.body.title}`, advice: `${req.body.advice}` } },
      { upsert: true, returnNewDocument: true },
    );
  };
  catch(e) {
    print(e);
  }
  return res.status();
});

module.exports = questionsRouter;
