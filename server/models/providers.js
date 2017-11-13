const db = require('../../database/schemas/db');
const Providers = require('../../database/schemas/providers')
const Promise = require('bluebird');

module.exports = {
    getProviders: (fields) => {
        return new Promise(
            (resolve, reject) => {
                //db.collection('Providers').findOne(fields), (error, data) => {
                Providers.find(fields, (error, data) => {    
                    if (error) {
                        reject(null, error)
                    } else {

                        resolve(data)
                    }
                });
            }
        )
    }
};