//Upload csv file to db (On command prompt from parent folder)
mongoimport --db searchAPI --collection providers --type csv --file database/data/ProviderRawData.csv --headerline;

//Login to Mongo Shell by
//mongo
//use searchAPI

//Run Mongo shell commands
//Extract currency and amount
db.providers.find().forEach(
    function (elem) {
        db.providers.update(
            {
                _id: elem._id
            },
            {
                $set: {
                    "NACC.currency": elem["Average Covered Charges"].substr(0, 1),
                    "NACC.amount": elem["Average Covered Charges"].substr(1),
                    "NATP.currency": elem["Average Total Payments"].substr(0, 1),
                    "NATP.amount": elem["Average Total Payments"].substr(1),
                    "NAMP.currency": elem["Average Medicare Payments\\"].substr(0, 1),
                    "NAMP.amount": elem["Average Medicare Payments\\"].slice(1, -1)
                }
            }
        );
    }
);

//Delete existing fields
db.providers.update({}, { $unset: {"Average Covered Charges": 1 } }, { multi: true });
db.providers.update({}, { $unset: { "Average Total Payments": 1 } }, { multi: true });
db.providers.update({}, { $unset: { "Average Medicare Payments\\": 1 } }, { multi: true });

//Rename fields correctly
db.providers.updateMany({}, { $rename: { "NACC": "Average Covered Charges" } });
db.providers.updateMany({}, { $rename: { "NATP": "Average Total Payments" } });
db.providers.updateMany({}, { $rename: { "NAMP": "Average Medicare Payments" } });

//Convert String to Float with 2 decimal
db.providers.find().forEach(function (doc) {
    doc["Average Covered Charges"].amount = parseFloat(parseFloat(doc["Average Covered Charges"].amount).toFixed(2));
    doc["Average Total Payments"].amount = parseFloat(parseFloat(doc["Average Total Payments"].amount).toFixed(2));
    doc["Average Medicare Payments"].amount = parseFloat(parseFloat(doc["Average Medicare Payments"].amount).toFixed(2));
    db.providers.save(doc);
});

//Check the result
db.providers.findOne();

//Upload the database mirror to MLab