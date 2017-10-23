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
const mongo = require('mongodb');
const ObjectID = require('bson-objectid'); //for accessing ObjectID()

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
      const hex = req.body['_id'] + ''; 
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const id = req.body['_id'];
      const msg = {
        to: email,
        from: 'questions@importantmen.com',
        subject: 'Hello Matthew!',
        text: hex, //not hex string, actual type string
        html: `<p>You have a new question!</p>
              <h3>Contact Details<h/3>
              <ul>
              <li>Name: ${req.body.name}</li>
              <li>Email: ${req.body.email}</li>
              <li>Mongo ID: ${hex} </li>
              </ul>
              <h3>Message</h3>
              <p>${req.body.comment}</p>
              <br><hr><br>
              <h3>Respond in this form below</h3>
              <form id="res-form"  action="http://localhost:3000/questions/response/" method="post">
              <input id='fromAsk' type='hidden' value="${id}">
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
      console.log(msg);
      return res.send('you sent a question + question handled by sendgrid');
    }
    return res.status;
  });
});

//'questions/response' endpoint hit when user selects to see all q+a
questionsRouter.post('/response', (req, res, err) => {
  const db = dB.get();
  const collection = db.collection('questions');
  const s = req.body.fromAsk.toArray();
  console.log(s);
  const safeObjectId = s => ObjectID.isValid(s) ? new ObjectID(s) : null;
  const id = s;
  collection.findOneAndUpdate(
    { _id: safeObjectId(id) },
    { $addToSet: { answerTitle: `${req.body.title}`, advice: `${req.body.advice}` } },
    { returnOriginal: true }
  )
    .then( (result, error) => {
      if (error) {
        console.log(error); 
      }
      console.log(result);
      res.send('Your response was submitted to the Matthieu database')
    });
  // const o_id = ObjectID.createFromHexString(hexString);
  // collection.findOneAndUpdate(
  //   { _id: {$eq: [o_id] } }, //query
  //   // { _id: { $eq: db.ObjectId(o_id) } }, //query
  //   { $addToSet: { answerTitle: `${req.body.title}`, advice: `${req.body.advice}` } }, //option of addToSet
  //   { upsert: true, returnNewDocument: true },
  // );
  // console.log(err);
});
module.exports = questionsRouter;
