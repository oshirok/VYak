var mongoose = require('mongoose');

// Set up the mongoose model
module.exports = mongoose.model('Message', {
        timestamp: Number,
        text: String,
        vote: Number
});