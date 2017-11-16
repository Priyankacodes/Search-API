const express = require('express');
var Models = require('../database/schemas/providers');   
var cors = require('cors');
const controllers = require('./controllers');

// Middleware
const morgan = require('morgan');
const parser = require('body-parser');

// Router
const router = require('./routes.js');

const app = express();

module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(cors())

// Set up our routes
app.use('/v1/providers', controllers.providers.get);

// If we are being run directly, run the server.
if (!module.parent) {
    app.listen(process.env.PORT || app.get('port'));
    console.log('Listening on', app.get('port'));
}   