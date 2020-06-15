const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    date : {
        // date of the game
        type: Date,
        default: Date.now,
    },
    challenge: {
        // enum: Single, Best of Three, Best of Four...
        type: String,
        default: 'Single',
    },
    first_game_in_challenge: {
        type: Boolean,
        default: "false",
    },
    related_games: { // in case of a challenge  (e.g. best of 3)
        type: [mongoose.Types.ObjectId],
        default: [],
    },
    grid_type: {
        // 10x10, 20x20...
        type: Number,
        default: 10,
    },
    fleet_type: {
        // Small, Normal, Large...
        type: String,
        default: "Normal",
    },
    winner : {
        // winner's info
        id: { type: mongoose.Types.ObjectId, required: true, },
        username : {type: String, required: true,},
        score: {type: Number, required: true},
        hit_miss_ratio : {type: Number, required: true},
        shots_fired : {type: Number, required: true},
        fleet_name : {type: String, "default":"The usual"},
    },
    loser : {
        // loser's info
        id: { type: mongoose.Types.ObjectId, required: true, },
        username : {type: String, required: true,},
        score: {type: Number, required: true},
        hit_miss_ratio : {type: Number, required: true},
        shots_fired : {type: Number, required: true},
        fleet_name : {type: String, required: true},
    },
    surrendered : {
        // did the loser surrender
        type: Boolean,
        required: true,
    },
    rounds : {
        // number of rounds during the game
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Game', GameSchema); 
