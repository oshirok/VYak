var express = require('express');
var app = express();
// var mongoose = require('mongoose');

var http = require('http');
var port = process.env.port || 1337;

app.use(express.static(__dirname + '/public'));
app.listen(port);

console.log("WEEEEEEEEEEEEE");