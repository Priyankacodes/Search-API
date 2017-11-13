/* MongoDB and Node server running for these tests to pass. */

const request = require('request');
const expect = require('chai').expect;

describe('Provider API', function () {

    //Base Test case
    it('Fetch Provider Information', function (done) {
        request({
            method: 'GET',
            uri: 'http://127.0.0.1:3000/providers?state=AL'
            }, function (error, response, body) {
                console.log(body);
                done();
            }
        );
    });
});