/* MongoDB and Node server running for these tests to pass. */

const request = require('request');
const expect = require('chai').expect;

describe('Provider API', function () {

    //Base Test case
    it('Fetch Provider Information based on state', function (done) {
        request({
            method: 'GET',
            uri: 'http://127.0.0.1:3000/v1/providers?state=AL'
            }, function (error, response, body) {
                console.log(body);
                done();
            }
        );
    });
    it('Fetch Provider Information based on max discharges in particular state', function (done) {
        request({
            method: 'GET',
            uri: 'http://127.0.0.1:3000/v1/providers?min_discharges=100&state=CA'
        }, function (error, response, body) {
            console.log(body);
            done();
        }
        );
    });
    it('Fetch Provider Information based on valid range of Average Covered Charges', function (done) {
        request({
            method: 'GET',
            uri: 'http://127.0.0.1:3000/v1/providers?max_average_covered_charges=50000&min_average_covered_charges=40000&state=CA'
        }, function (error, response, body) {
            console.log(body);
            done();
        }
        );
    });
    it('Fetch Provider Information based on valid range of parameters', function (done) {
        request({
            method: 'GET',
            uri: 'http://127.0.0.1:3000/v1/providers?max_discharges=1000&min_discharges=6&max_average_covered_charges=50000' +
            '&min_average_covered_charges=40000&min_average_medicare_payments=6000' +
            '&max_average_medicare_payments=10000&state=VA'
        }, function (error, response, body) {
            body = JSON.parse(body)
            expect(response.statusCode).to.equal(200);
            done();
        }
        );
    });
    it('Fetch Provider Information based on valid range of parameters with no matching data', function (done) {
        request({
            method: 'GET',
            uri: 'http://127.0.0.1:3000/v1/providers?max_discharges=1000&min_discharges=6&max_average_covered_charges=50000' +
            '&min_average_covered_charges=40000&min_average_medicare_payments=6999' +
            '&max_average_medicare_payments=7000&state=HI'
        }, function (error, response, body) {
            console.log(body)
            expect(response.statusCode).to.equal(404);
            done();
        }
        );
    });
    it('Fetch Provider Information based on invalid range of parameters', function (done) {
        request({
            method: 'GET',
            uri: 'http://127.0.0.1:3000/v1/providers?max_discharges=5&min_discharges=6&max_average_covered_charges=50000' +
                 '& min_average_covered_charges=40000&min_average_medicare_payments=6000' +
                 '&max_average_medicare_payments=10000&state=GA'
        }, function (error, response, body) {
            expect(response.statusCode).to.equal(400);
            done();
        }
        );
    });
    it('Fetch Provider Information for empty query string', function (done) {
        request({
            method: 'GET',
            uri: 'http://127.0.0.1:3000/v1/providers'
        }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        }
        );
    });
});