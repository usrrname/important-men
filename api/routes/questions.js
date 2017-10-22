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
        html: `<p>You have a new question.</p>
      <h3>Contact Details<h/3>
      <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.comment}</p>
      `,
      };
      sgMail.send(msg);
      return res.send('you sent a question + question handled by sendgrid');
    }
  return res.status;
  });
});

module.exports = questionsRouter;
