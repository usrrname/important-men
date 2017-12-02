// this file is questions/whatever-endpoint
const express = require('express');
const dB = require('../mongo');

const questionsRouter = express.Router();

// for nodemailer & sendgrid
const sgMail = require('@sendgrid/mail');
const { ObjectID } = require('mongodb'); // for accessing ObjectID()

const key = process.env.SENDGRID_API_KEY;
const email = process.env.EMAIL;
const sender = process.env.SENDER;

// 'questions/' endpoint hit when user selects to see all q+a
questionsRouter.get('/', (req, res) => {
  const db = dB.get();
  const collection = db.collection('questions');
  collection.find({
    $and: [
      { comment: { $exists: true } },
      { advice: { $exists: true } },
    ],
  }).toArray((err, resp) => {
    if (err) {
      throw err;
    }
    res.json(resp);
  });
});

questionsRouter.post('/ask', (req, res) => {
  console.log('question received');
  const db = dB.get();
  const collection = db.collection('questions');
  collection.insert(req.body, (err) => {
    if (err) {
      console.log(`err: ${err}`);
    } else {
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
              <input id='fromAsk' name='fromAsk' type='hidden' value="${hex}"><br>
              </ul>
              <h3>Message</h3>
                <p>${req.body.comment}</p>
              <br><hr><br>
              <h3>What do you think the question was about?</h3>
                <label>Summarize the question into a click-baity title</label> This will be used as a heading over each Q+A <br>
                <input id='title' name='title' placeholder='A catchy title or question' type='text'><br>

                <h3>Respond to the question in this field below</h3>
                <label>Your Answer</label><br>
                  <textarea id='advice' name='advice' type='text' placeholder='Enter Your Lovely Advice :)' width='70%' height='50%'></textarea><br>
                <div>
                  <input id="answerButton" type="submit" value="Submit">
                </div>
              </form>`,
      };
      sgMail.send(msg);
    }
  });
  res.redirect('../../submitted/');
});

// 'questions/response' endpoint hit when user selects to see all q+a //
questionsRouter.post('/response', (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const db = dB.get();
  const collection = db.collection('questions');
  collection.findAndModify(
    { _id: ObjectID(req.body.fromAsk) },
    { remove: false },
    {
      $set: {
        questionTitle: `${req.body.title}`,
        advice: `${req.body.advice}`,
      },
    },
    { new: true, upsert: true },
    (error, doc) => {
      if (error) {
        console.log(error);
      }
      console.log('find and modified  ' + doc.json(doc));
    },
  );
  res.send('Thanks Matt. Your response has been submitted.');
});

module.exports = questionsRouter;