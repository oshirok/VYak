var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var server = require('http').Server(app);
var io = require('socket.io')(server);

var http = require('http');
var port = process.env.PORT || 3000; // port MUST BE UPPERCASED

// Uses date to make timestamps
var date = new Date();

// Connects to database
mongoose.connect('mongodb://vyak:vyak@ds047762.mongolab.com:47762/vyak');

app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


// Models for database
var Message = mongoose.model('Message', {
    timestamp : String,
    text : String,
});

// Making RESful API routes
// API: Get messages
app.get('/api/messages', function (req, res) {
    
    Message.find(function (err, messages) {
        if (err)
            res.send(err);
        messages.timestamp = new Date(messages.timestamp);
        res.json(messages.reverse());

    });
});

// API: Add message
app.post('/api/messages', function (req, res) {
    console.log(req.body);
    Message.create({
        timestamp: new Date(date.getTime()),
        text: req.body.text,
        done: false
    }, function (err, messages) {
        if (err)
            res.send(err);
        
        // return all messages after you create another
        Message.find(function (err, messages) {
            if (err)
                res.send(err)
            io.sockets.emit('please_update_now');
            res.json(messages);
        });
    });
});

/* API: Todo: Upvote a message */ 

/* API: Todo: Downvote a message */ 

// HTTP: serve files from the public folder
app.use(express.static(__dirname + '/public'));

// Server, not app must listen
server.listen(port);

// Read new connection
io.on('connection', function (socket) {
    console.log('a user connected');
});

// Print the port
//console.log("WEEEEEEEEEEEEE" + port);