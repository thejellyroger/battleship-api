const router = require('express').Router();

// database
const mongoose = require('mongoose');
const Player = require('../models/Player');

router.get('/', async (req, res) => {
    // retrieve all players
    try {
        const players = await Player.find();
        res.json(players);
    } catch(err) {
        res.json({message: err});
    }
});

router.get('/:id', (req,res) => {
    // lookup the user with that id
    res.json(req.params.id);
});

router.post('/addPlayer/:name', async (req,res) => {
    const player = new Player({
        username: req.params.name
    });
    
    try {
        const savedPlayer = await player.save();
        res.json(savedPlayer);
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