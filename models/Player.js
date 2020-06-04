const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    games : [mongoose.Types.ObjectId],
    tot_hits : Number,
    tot_miss : Number,

});

module.exports = mongoose.model('Player', PlayerSchema); 
