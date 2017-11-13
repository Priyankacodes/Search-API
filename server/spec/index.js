/* MongoDB and Node server running for these tests to pass. */

const request = require('request');
const expect = require('chai').expect;

describe('Provider API', function () {

    //Base Test case
    it('Fetch Provider Information based on state', function (done) {
        request({
            method: 'GET',
            uri: 'http://127.0.0.1:3000/providers?state=AL'
            }, function (error, response, body) {
                console.log(body);
                done();
            }
        );
    });
    it('Fetch Provider Information based on max discharges', function (done) {
        request({
            method: 'GET',
            uri: 'http://127.0.0.1:3000/providers?min_discharges=100&state=CA'
        }, function (error, response, body) {
            console.log(body);
            done();
        }
        );
    });
});