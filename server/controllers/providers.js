const models = require('../models/providers');
const utils = require('../middleware/utils');

module.exports = {
    get: function (req, res) { // a function which handles a search request for providers
        const queryParameters = req.query;
        const fields = utils.queryBuilder(queryParameters);
        if (!fields) {
            res.status(400).send('Invalid Parameters');
        } else {
            models.getSearchProviders(fields)
            .then((data) => {
                if (data.length > 0) {
                    let formattedData = utils.formatData(JSON.parse(JSON.stringify(data)))
                    res.status(200).json(formattedData);
                } else {
                    res.status(404).send('No Data Found');
                }
                res.end();
            })
            .catch((err) => {
                console.log('Error fetching data', err)
                res.status(500).send('Internal Server Error');
            })
        }
    } 
};