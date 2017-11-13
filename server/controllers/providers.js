const models = require('../models/providers');

module.exports = {
    get: function (req, res) { // a function which handles a search request for providers
        const queryParameters = req.query;
        const fields = queryBuilder(queryParameters);
        console.log('fields2', fields)
        models.getProviders(fields)
        .then((data) => {
            if (data.length > 0) {
                res.status(200).send(data);
            } else {
                res.write('No Provider Found');
            }
            res.end();
        })
        .catch((err) => {
            console.log('Error fetching data', err)
            res.status(404).send(err);
        })
    } 
};

const queryBuilder = function(queryParameters) {
    let fields = {}
    for (let parameter in queryParameters) {
        switch (parameter) {
            case 'max_discharges':
                fields['Total Discharges'] = fields['Total Discharges'] || {};
                fields['Total Discharges']['$lt'] = queryParameters[parameter]
                break;
            case 'min_discharges':
                fields['Total Discharges'] = fields['Total Discharges'] || {};
                fields['Total Discharges']['$gt'] = queryParameters[parameter]
                break;
            case 'max_average_covered_charges':
                fields['Average Covered Charges'] = fields['Average Covered Charges'] || {};
                fields['Average Covered Charges']['$lt'] = queryParameters[parameter]
                break;
            case 'min_average_covered_charges':
                fields['Average Covered Charges'] = fields['Average Covered Charges'] || { };
                fields['Average Covered Charges']['$gt'] = queryParameters[parameter]
                break;
            case 'state':
                fields['Provider State'] = queryParameters[parameter]
                break;
            default:
                break;
        }
    }

    return fields;
}