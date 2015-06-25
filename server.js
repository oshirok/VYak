var express = require('express');
var app = express();
var mongoose = require('mongoose');

var http = require('http');
var port = process.env.port || 1337;

// Models
var Message = mongoose.model('Message', {
    timestamp : Number,
    text : String,
});

mongoose.connect('mongodb://vyak:vyak@ds047762.mongolab.com:47762/vyak');

// Making RESful API routes
app.get('/api/messages', function (req, res) {
    
    Messages.find(function (err, messages) {
        if (err)
            res.send(err);
        res.json(messages); // return all messages in JSON format

    });
});

app.post('/api/messages', function (req, res) {
    Messages.create({
        timestamp: req.body.timestamp,
        text: req.body.text,
        done: false
    }, function (err, messages) {
        if (err)
            res.send(err);
        
        // return all messages after you create another
        Messages.find(function (err, messages) {
            if (err)
                res.send(err)
            res.json(messages);
        });
    });
});

app.use(express.static(__dirname + '/public'));
app.listen(port);

console.log("WEEEEEEEEEEEEE" + port);