var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var server = require('http').Server(app);

var http = require('http');
var port = process.env.PORT || 3000; // port MUST BE UPPERCASED

// Uses date to make timestamps
var date = new Date();

// Connects to database
mongoose.connect('mongodb://vyak:vyak@ds047762.mongolab.com:47762/vyak');

// Config
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Import the routes
require('./app/routes.js')(app, server);

// HTTP: serve files from the public folder
app.use(express.static(__dirname + '/public'));

// Server, not app must listen
server.listen(port);