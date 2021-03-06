// // this file is questions/whatever-endpoint 
// const express = require('express');
// const dB = require('../mongo');

// const questionsRouter = express.Router();
// const bodyParser = require('body-parser');

// // for sendgrid
// const sgMail = require('@sendgrid/mail');

// const key = process.env.SENDGRID_API_KEY;
// const email = process.env.EMAIL;
// const ObjectID = require('mongodb').ObjectID; // for accessing ObjectID()

// // 'questions/' endpoint hit when user selects to see all q+a
// questionsRouter.get('/', (req, res) => {
//   const db = dB.get();
//   const collection = db.collection('questions');
//   collection.find({
//     $and: [
//       { name: { $exists: true } },
//       { comment: { $exists: true } },
//       { advice: { $exists: true } },
//     ],
//   }).toArray((err, resp) => {
//     if (err) {
//       throw err;
//     }
//     res.json(resp);
//   });
// });

// questionsRouter.post('/ask', (req, res) => {
//   console.log('question received');
//   const initialInfo = {
//           name: `${req.body.name}`,
//           email: `${req.body.email}`,
//           message: `${req.body.comment}`,
//       };
//   const db = dB.get();
//   const collection = db.collection('questions');
//   collection.insert(req.body, (err, result) => {
//     if (err) {
//       console.log(`err: ${err}`);
//     } else {
//       collection.createIndex({
//         sku: 1,
//       }, {
//         unique: true,
//       });
//       console.log(result);
//       console.log('inserted');
//       const hex = req.body['_id'] + ''; //coerced into string 
//       sgMail.setApiKey(key);
//       const msg = {
//         to: email,
//         from: 'questions@importantmen.com',
//         subject: 'Hello Matthew!',
//         text: hex,
//         html: `<p>You have a new question!</p>
//         < form id = "res-form"
//         action = "https://important-men.herokuapp.com/questions/response"
//         method = "post" >
//             <h3>Contact Details<h/3>
//               <ul>
//                 <li>Name: ${req.body.name}</li>
//                 <input type='hidden' name='name' value='${req.body.name}'>
//                 <li>Email: ${req.body.email}</li>
//                 <input type='hidden' name='email' value='${req.body.email}'>
//                 <li id='mongoString' name='mongoString'>Mongo ID: ${hex} for admin purposes </li>
//               </ul>
//               <h3>Message</h3>
//                 <p>${req.body.comment}</p>
//                 <input type='hidden' name='comment' value='${req.body.comment}'>
//               <br><br>
//               <h3>Respond below</h3>
//               <input id='fromAsk' name='fromAsk' type='hidden' value="${hex}"><br>
//                 <label>Subject Line</label><br>
//                   <input id='title' name='title' placeholder='subject line' type='text'><br>
//                 <label>Your Answer</label><br>
//                   <textarea id='advice' name='advice' type='text' placeholder='Enter Your Lovely Advice :)'></textarea><br>
//                 <div>
//                   <input id="answerButton" type="submit" value="Submit">
//                 </div>
//               </form>`,
//       };
//       sgMail.send(msg);
//       setTimeout((err, resp) => {
//         if (err) {
//           console.log(err);
//         }
//       res.send('you sent a question + question handled by sendgrid. You are being redirected back to page');
//       window.location.replace('./matt/');
//       }, 1000);
//     }
//   });
// });

// // 'questions/response' endpoint hit when user selects to see all q+a //
// questionsRouter.post('/response', (req, res, err) => {
//   if (err) {
//     console.log(err);
//   }
//   const db = dB.get();
//   const initialInfo = {
//     name: `${req.body.name}`,
//     email: `${req.body.email}`,
//     message: `${req.body.comment}`,
//   };

//   const collection = db.collection('questions');
//   const selectParas = { _id: ObjectID(req.body.fromAsk) };
//   const updateValues = {
//     answerTitle: `${req.body.title}`,
//     advice: `${req.body.advice}`,
//   };
//   //  find the objects the only have an ID, set and update newvalues  //
//   db.runCommand({
//     findAndModify: 'questions',
//     query: {
//       _id: ObjectID(req.body.fromAsk),
//       $or: [{ status: 'A', qty: 1 }],
//     },
//     status: 'A',
//     remove: false,
//     $set: updateValues,
//     new: true,
//     fields: {
//       item: 1,
//       status: 1,
//     },
//     upsert: true,
//   }).then((result, error) => {
//     if (error) {
//       console.log(error);
//     }
//     console.log('result:', result);
//     result.send('Your response was submitted to the Matthieu database <a href="http://www.importantmen.com/matt/">Return To Site</a>');
//   });
// });

// module.exports = questionsRouter;
