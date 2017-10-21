const express = require('./express');
const questions = require('./routes/questions');
const path = require('path');
const nodemailer = require('nodemailer');
const SENDGRID_API_KEY = require('../sendgrid.env');



// const sgMail = require('@sendgrid/mail');

// app.post('/ask', (req, res, err) =>{
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     const msg = {
//       to: 'test@example.com',
//       from: 'test@example.com',
//       subject: 'Sending with SendGrid is Fun',
//       text: 'and easy to do anywhere, even with Node.js',
//       html:`<p>You have a new question.</p>
//       <h3>Contact Details<h/3>
//       <ul>
//       <li>Name: ${req.body.name}</li>
//       <li>Email: ${req.body.email}</li>
//       </ul>
//       <h3>Message</h3>
//       <p>${req.body.comment}</p>
//       `,
//     };
//     sgMail.send(msg);
// });
