const router = require('express').Router();

// database
const mongoose = require('mongoose');
const Player = require('../models/Player');
const Game = require('../models/Game');

router.get('/', async (req, res) => {
    // retrieve all players
    try {
        const players = await Player.find();
        res.json(players);
    } catch(err) {
        res.json({message: err});
    }
});

router.get('/:playerId', (req,res) => {
    // lookup the user with specific id
    Player.findById(mongoose.Types.ObjectId(req.params.playerId), function (err, player) { 
        if (!player) {
            error = "Player not found";
            res.status(404).json({ error });
            // stop further execution in this callback
            return;
        }
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(player);
    });

});
router.get('/basicInfo/:playerId', (req,res) => {
    // return the player with the 30 most recently played games
    Player.findById(mongoose.Types.ObjectId(req.params.playerId),  { games: {$slice: 30} } , function (err, player) { 
        if (!player) {
            error = "Player not found";
            res.status(404).json({ error });
            // stop further execution in this callback
            return;
        }
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        
        res.json(player);
    });
});

// add a new player in the database with a custom username
router.post('/addPlayer/:name', async (req,res) => {
    const player = new Player({
        username: req.params.name,
    });
    
    try {
        // return the id of the newly created player
        const savedPlayer = await player.save();
        console.log(savedPlayer._id);
        res.json({"_id" : String(savedPlayer._id)});
    } catch(err) {
        console.log(err);
        res.json({message: err});
    }
});


// delete a player with a specific id
router.delete('/deletePlayer/:playerId', (req,res) => {
    Player.findByIdAndRemove(req.params.playerId, {useFindAndModify: false}, (err, player) => {
        // handle any potential errors:
        if (err) return res.status(500).send(err);
        // send back the id of the document that was removed
        const response = {
            message: "Player successfully deleted",
            id: player._id
        };
        return res.status(200).send(response);
    });
});

module.exports = router;