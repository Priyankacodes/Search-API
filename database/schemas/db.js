const url = require('../../config/default')['MONGODB_URL'];
const MongoClient = require('mongodb').MongoClient;
let database;

// MongoClient.connect(url, function (err, db) {
//     console.log("Connected correctly to Mongo server.");
//     database = db;
// });

module.exports = database;  