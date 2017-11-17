// this file is questions/whatever-endpoint
const express = require('express');
const dB = require('../mongo');

const questionsRouter = express.Router();

// for nodemailer & sendgrid
const sgMail = require('@sendgrid/mail');
const { ObjectID } = require('mongodb'); // for accessing ObjectID()

const key = process.env.SENDGRID_API_KEY;
const email = process.env.EMAIL;
const sender = process.env.SENDER || 'questions@importantmen.com';

// 'questions/' endpoint hit when user selects to see all q+a
questionsRouter.get('/', (req, res) => {
  const db = dB.get();
  const collection = db.collection('questions');
  collection.find({
    $and: [
      { name: { $exists: true } },
      { comment: { $exists: true } },
      { advice: { $exists: true } },
    ],
  }).toArray((err, resp) => {
    if (err) {
      throw err;
    }
    res.json(resp);
    console.log(resp);
  });
});

questionsRouter.post('/ask', (req, res) => {
  console.log('question received' + res);
  const db = dB.get();
  const collection = db.collection('questions');
  collection.insert(req.body, (err, result) => {
    if (err) {
      console.log(`err: ${err}`);
    } else {
      console.log(result);
      console.log('inserted');

      const hex = String(req.body['_id']);
      sgMail.setApiKey(key);
      const msg = {
        to: email,
        from: sender,
        subject: 'Hello Matthew!',
        text: hex,
        html: `<p>You have a new question!</p>
        <form id="res-form"  action="https://important-men.herokuapp.com/questions/response/" method="post">  
            <h3>Contact Details<h/3>
              <ul>
                <li>Name: ${req.body.name}</li>
                <input type='hidden' name='name' value='${req.body.name}'>
                <li>Email: ${req.body.email}</li>
                <input type='hidden' name='email' value='${req.body.email}'>
                <li id='mongoString' name='mongoString'>Mongo ID: ${hex} </li>
              </ul>
              <h3>Message</h3>
                <p>${req.body.comment}</p>
              <br><hr><br>
              <h3>Respond in this form below</h3>
              <input id='fromAsk' name='fromAsk' type='hidden' value="${hex}"><br>
                <label>Subject Line</label><br>
                  <input id='title' name='title' placeholder='subject line' type='text'><br>
                <label>Your Answer</label><br>
                  <textarea id='advice' name='advice' type='text' placeholder='Enter Your Lovely Advice :)'></textarea><br>
                <div>
                  <input id="answerButton" type="submit" value="Submit">
                </div>
              </form>`,
      };
      sgMail.send(msg).then((error, response) => {
        if (error) {
          console.log(error);
        }
        response.send('you sent a question + question handled by sendgrid');
      });
    }
  });
});

// 'questions/response' endpoint hit when user selects to see all q+a //
questionsRouter.post('/response', (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const db = dB.get();
  const collection = db.collection('questions');

  collection.findOneAndUpdate(
    { _id: ObjectID(req.body.fromAsk) }, req.body,
    {
      $addToSet: {
        name: `${req.body.name}`,
        email: `${req.body.email}`,
        message: `${req.body.comment}`,
        answerTitle: `${req.body.title}`,
        advice: `${req.body.advice}`,
      },
    },
    { upsert: true, returnNewDocument: true },
  ).then((result, error) => {
    if (error) {
      console.log('error:', error);
    }
    console.log('result:', result);
    result.send('Your response was submitted to the Matthieu database <a href="http://www.importantmen.com/matt/">Return To Site</a>');
  });
});
module.exports = questionsRouter;
