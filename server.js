var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var http = require('http');
var port = process.env.port || 1337;

var date = new Date();

mongoose.connect('mongodb://vyak:vyak@ds047762.mongolab.com:47762/vyak');

app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Models
var Message = mongoose.model('Message', {
    timestamp : Number,
    text : String,
});

app.use(express.static(__dirname + '/public'));
app.listen(port);

// Making RESful API routes
app.get('/api/messages', function (req, res) {
    
    Message.find(function (err, messages) {
        if (err)
            res.send(err);
        res.json(messages); // return all messages in JSON format

    });
});

app.post('/api/messages', function (req, res) {
    console.log(req.body);
    Message.create({
        timestamp: date.getTime(),
        text: req.body.text,
        done: false
    }, function (err, messages) {
        if (err)
            res.send(err);
        
        // return all messages after you create another
        Message.find(function (err, messages) {
            if (err)
                res.send(err)
            res.json(messages);
        });
    });
});

console.log("WEEEEEEEEEEEEE" + port);