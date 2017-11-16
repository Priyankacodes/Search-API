const Providers = require('../../database/schemas/providers')
const Promise = require('bluebird');

module.exports = {
    getSearchProviders: (fields) => {
        return new Promise(
            (resolve, reject) => {
                Providers.find(fields.parameters, '-_id', (error, data) => {    
                    if (error) {
                        reject(null, error)
                    } else {
                        resolve(data)
                    }
                }).limit(fields.limit);
            }
        )
    }
};