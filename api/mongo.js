// var config = require('./config');
const MongoClient = require('mongodb').MongoClient
, assert = require('assert');

// Use connect method to connect to the Server

const db = null;

module.exports = {
  start: () => {
    MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
      if (err) {
        console.log(`err: ${err}`);
      } else {
        console.log('Connected correctly to server');
        const db = database;
      }
    });
  },
  get: () => db,
};
