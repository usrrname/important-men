var express = require('express');
var app = express();
var router = express.Router();
var https = require('https');
var nodemailer = require('nodemailer');

var server = require('./server.js');
 /*
    configuring our SMTP Server details.
     STMP is mail server which is responsible for sending and recieving email.
 */
 var smtpTransport = nodemailer.createTransport("SMTP",{
     service: "Gmail",
     auth: {
         user: "Your Gmail ID",
         pass: "Gmail Password"
     }
 });

 var rand,mailOptions,host,link;

 /*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/send',function(req,res){
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
     link="http://"+req.get('host')+"/verify?id="+rand;
     mailOptions={
         to : req.query.to,
         subject : "Question",
         html : "Hello,<br> Please Click on the link to verify your email.<br> <a href=" + link + ">Click here to verify</a>" 
     }
     console.log(mailOptions);
     smtpTransport.sendMail(mailOptions, function(err, response){
      if(err){
             console.log(err);
         res.end("error");
      }else{
             console.log("Message sent: " + response.message);
         res.end("sent");
          }
 });
 });

 app.get('/verify',function(req,res){
console.log(req.protocol + ":/" + req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
   if(req.query.id==rand){
        console.log("email is verified");
       res.end("<h1>Email "+mailOptions.to+" has been Successfully verified");
     }
 else{
         console.log("email is not verified");
         res.end("<h1>Bad Request.</h1><p>Email is not verified, does not work, or just doesn't exist. Try again.</p>");
     }
    }
 else {    res.end("<h1>Request is from unknown source");
    }
});

 /*--------------------Routing Over----------------------------*/
 module.exports = router;