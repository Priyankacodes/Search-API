module.exports = {
    validate: (key, minmax, parameters, value) => {

        if (typeof(value) === 'number') { //Return negative as invalid value
            if (value < 0) {
                return false
            }
        }

        //check for duplicates for numeric fields
        if (parameters[key]) {
            if (minmax === 'max' && parameters[key]['lt'] ) { //for checking duplicate
                return false
            }
            if (minmax === 'min' && parameters[key]['gt']) {//for checking duplicate
                return false
            }
            if (minmax === 'max' && parameters[key]['gt'] && value < parameters[key]['gt']) {
                console.log('r')
                return false
            }
            if (minmax === 'min' && parameters[key]['lt'] && value < parameters[key]['lt']) {
                console.log('r')
                return false
            }
        }
        return true;
    },

    queryBuilder: (queryParameters) => {
        let fields = {
            parameters: {},
            limit: 5 //default limit to 5
        }

        let validParameter = true;

        for (let parameter in queryParameters) {
            switch (parameter) {
                case 'max_discharges':
                    fields.parameters['Total Discharges'] = fields.parameters['Total Discharges'] || {};
                    fields.parameters['Total Discharges']['$lte'] = queryParameters[parameter]
                    break;
                case 'min_discharges':
                    fields.parameters['Total Discharges'] = fields.parameters['Total Discharges'] || {};
                    fields.parameters['Total Discharges']['$gte'] = queryParameters[parameter]
                    break;
                case 'max_average_covered_charges':
                    fields.parameters['Average Covered Charges.amount'] = fields.parameters['Average Covered Charges.amount'] || {};
                    validParameter = utils.validate('Average Covered Charges.amount', 'max', fields.parameters, queryParameters[parameter]) 
                    if (!validParameter) {
                        return false
                    }
                    fields.parameters['Average Covered Charges.amount']['$lte'] = queryParameters[parameter]
                    break;
                case 'min_average_covered_charges':
                    fields.parameters['Average Covered Charges.amount'] = fields.parameters['Average Covered Charges.amount'] || {};
                    validParameter = utils.validate('Average Covered Charges.amount', 'min', fields.parameters, queryParameters[parameter])
                    if (!validParameter) {
                        return false
                    }
                    fields.parameters['Average Covered Charges.amount']['$gte'] = queryParameters[parameter]
                    break;
                case 'max_average_medicare_payments':
                    fields.parameters['Average Medicare Payments.amount'] = fields.parameters['Average Medicare Payments.amount'] || {};
                    validParameter = utils.validate('Average Medicare Payments.amount', 'max', fields.parameters, queryParameters[parameter])
                    if (!validParameter) {
                        return false
                    }
                    fields.parameters['Average Medicare Payments.amount']['$lte'] = queryParameters[parameter]
                    break;
                case 'min_average_medicare_payments':
                    fields.parameters['Average Medicare Payments.amount'] = fields.parameters['Average Medicare Payments.amount'] || {};
                    validParameter = utils.validate('Average Medicare Payments.amount', 'min', fields.parameters, queryParameters[parameter])
                    if (!validParameter) {
                        return false
                    }
                    fields.parameters['Average Medicare Payments.amount']['$gte'] = queryParameters[parameter]
                    break;
                case 'state':
                    if (fields.parameters['Provider State']) return false; //check for duplicate
                    if (typeof queryParameters[parameter] !== 'string') return false;
                    fields.parameters['Provider State'] = queryParameters[parameter]
                    break;
                case 'limit':
                    if (limit > 100) return false; //max page limit is 100
                    fields['limit'] = queryParameters[parameter]
                    break;
                default:
                    return false; //If undefined parameter, return false
                    break;
            }
        }

        return fields;
    },

    formatData: (data) => {
        return data.map(docs => {
            let tempData = {}
            for (var key in docs) {
                if (key === 'Average Medicare Payments' ||
                    key === 'Average Total Payments' ||
                    key === 'Average Covered Charges') {
                    tempData[key] = '' + docs[key]["currency"] + docs[key]["amount"] + ''
                } else {
                    tempData[key] = docs[key]
                }
            }
            return tempData
        })
    }
}

const utils = module.exports;