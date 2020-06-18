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
    // return the player with the 20 most recently played games
    Player.findById(mongoose.Types.ObjectId(req.params.playerId),  { games: {$slice: 20} } , function (err, player) { 
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

router.post('/addPlayer/:name', async (req,res) => {
    const player = new Player({
        username: req.params.name,
    });
    
    try {
        const savedPlayer = await player.save();
        console.log(savedPlayer._id);
        res.json({"_id" : String(savedPlayer._id)});
    } catch(err) {
        console.log(err);
        res.json({message: err});
    }
});

router.delete('/deletePlayer/:playerId', (req,res) => {
    Player.findByIdAndRemove(req.params.playerId, {useFindAndModify: false}, (err, player) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Player successfully deleted",
            id: player._id
        };
        return res.status(200).send(response);
    });
});

module.exports = router;