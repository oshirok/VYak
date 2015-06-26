// JavaScript source code
var Message = require('./model/message.js');

module.exports = function(app, server) {
    var io = require('socket.io')(server);
    // Making RESful API routes
    // API: Get messages
    app.get('/api/messages', function (req, res) {
        Message.find({}).sort({timestamp: -1}).exec(function (err, messages) {
            if (err)
                res.send(err);
            //messages now shown from newest to oldest
            res.json(messages);

        });
    });

    // API: Add message
    app.post('/api/messages', function (req, res) {
        console.log(req.body);
        console.log("d");
        
        // If text is empty then don't do anything
        if (!req.body.text) return;
        Message.create({
            timestamp: new Date().getTime()/1000,
            text: req.body.text,
            vote: 1,
            done: false
        }, function (err, messages) {
            io.sockets.emit('please_update_now');
            if (err)
                res.send(err);
        
            // return all messages after you create another
            Message.find({}).sort({ timestamp: -1 }).exec(function (err, messages) {
                if (err)
                    res.send(err);
                //messages now shown from newest to oldest
                res.json(messages);

            });
        });
    });

    /* API: Upvote a message */
    app.post('/api/upvote', function (req, res) {
        var message_id = req.param('_id');
        Message.findOne({ _id: message_id }, function (err, message) {
            vote_count = message.vote + 1;
            Message.findByIdAndUpdate(message_id, {
                $set: {
                    'vote': vote_count
                }
            }, function (err, messages) {
                if (err)
                    res.send(err);
            
                // return all messages after you create another
                Message.find({}).sort({ timestamp: -1 }).exec(function (err, messages) {
                    if (err)
                        res.send(err);
                    //messages now shown from newest to oldest
                    res.json(messages);
                });
            });
        });
    });
    /* API: Downvote a message */
    app.post('/api/downvote', function (req, res) {
        var message_id = req.param('_id');
        Message.findOne({ _id: message_id }, function (err, message) {
            vote_count = message.vote - 1;
            Message.findByIdAndUpdate(message_id, {
                $set: {
                    'vote': vote_count
                }
            }, function (err, messages) {
                if (err)
                    res.send(err);
            
                // return all messages after you create another
                Message.find({}).sort({ timestamp: -1 }).exec(function (err, messages) {
                    if (err)
                        res.send(err);
                    //messages now shown from newest to oldest
                    res.json(messages);
                });
            });
        });
    }); 

}