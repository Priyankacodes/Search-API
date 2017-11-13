const mongoose = require('mongoose');
const config = require('../../config/default')['MONGODB_URL'];
const opts = { useMongoClient: true };

var db = mongoose.createConnection(config);

let providerSchema = new mongoose.Schema({
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

var Providers = db.model('Provider', providerSchema);

module.exports = Providers;