const mongoose = require('mongoose');
const config = require('../../config/default')['MONGODB_URL'];
const DB_URL = process.env.MONGODB_URI || config

const db = mongoose.createConnection(DB_URL);

const providerSchema = new mongoose.Schema({
    "DRG Definition": String,
    "Provider Id": String,
    "Provider Name": String,
    "Provider Street Address": String,
    "Provider City": String,
    "Provider State": String,
    "Provider Zip Code": String,
    "Hospital Referral Region Description": String,
    "Total Discharges": Number,
    "Average Covered Charges": String, 
    "Average Total Payments": String,
    "Average Medicare Payments": String      
});

module.exports = db.model('Provider', providerSchema);