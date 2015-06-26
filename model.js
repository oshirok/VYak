var mongoose = require('mongoose');

module.exports = mongoose.model('Message', {
        timestamp: Number,
        text: String,
        vote: Number
    });