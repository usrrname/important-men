
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connect to the Server

let db = null;

module.exports = {
  start: () => {
    MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
      if (err) {
        console.log(`err: ${err}`);
      } else {
        console.log('Connected correctly to server');
        db = database;
      }
    });
  },
  get: () => db,
};
