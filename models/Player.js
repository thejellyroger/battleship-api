const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    games : {
        game_id: mongoose.Types.ObjectId,
        date: {type: String},
        challenge: {type: String},
        won: Boolean,
        surrendered: Boolean,
        opponent_username: String,
    },
    games_won : {type: Number, "default":0},
    games_lost : {type: Number, "default":0},

});

module.exports = mongoose.model('Player', PlayerSchema); 
