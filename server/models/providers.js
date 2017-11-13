const Providers = require('../../database/schemas/providers')
const Promise = require('bluebird');

module.exports = {
    getProviders: (fields) => {
        return new Promise(
            (resolve, reject) => {
                Providers.find(fields, (error, data) => {    
                    if (error) {
                        reject(null, error)
                    } else {

                        resolve(data)
                    }
                }).limit(5);
            }
        )
    }
};