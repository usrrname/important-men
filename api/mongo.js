// var config = require('./config');
const MongoClient = require('mongodb').MongoClient
, assert = require('assert');

// Connection URL
const url = process.env.MONGODB_URI;
// Use connect method to connect to the Server

const db = null;

module.exports = {
  start: () => {
    MongoClient.connect(url, (err, database) => {
      if (err) {
        console.log(`err: ${err}`);
      } else {
        console.log("Connected correctly to server");
        db = database;
      }
    });
  },
  get: () => db,
};
