const router = require('express').Router();

// database
const mongoose = require('mongoose');
const Game = require('../models/Game');
const Player = require('../models/Player');

router.get('/:gameId', (req,res) => {
    // look up a game with a specific id
    /*
        usage: the player has a reference to all the ids of the games they played
                in the app, a recycler view is created with all these ids and some other info.
                when the user clicks on a specific game, this api gets called, and uses the id as the parameter
    */
    Game.findById(mongoose.Types.ObjectId(req.params.gameId), function (err, game) { 
        if (!game) {
            error = "Game not found";
            res.status(404).json({ error });
            // stop further execution in this callback
            return;
        }
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(game);
    });

});

// add a new game in the database using the relevant info in the body of the request
router.post('/addGame/', async (req,res) => {
    const game = new Game({
        challenge: req.body.challenge,
        first_game_in_challenge: req.body.first_game_in_challenge,
        related_games: req.body.related_games,
        grid_type: req.body.grid_type,
        fleet_type: req.body.fleet_type,
        winner : {
            id : mongoose.Types.ObjectId(req.body.winner_id),
            username: req.body.winner_name,
            score: req.body.winner_score,
            hit_miss_ratio: req.body.winner_hit_miss_ratio,
            shots_fired: req.body.winner_shots_fired,
            fleet_name: req.body.winner_fleet_name
        },
        loser : {
            id : mongoose.Types.ObjectId(req.body.loser_id),
            username: req.body.loser_name,
            score: req.body.loser_score,
            hit_miss_ratio: req.body.loser_hit_miss_ratio,
            shots_fired: req.body.loser_shots_fired,
            fleet_name: req.body.loser_fleet_name
        },
        surrendered : req.body.surrendered,
        rounds : req.body.rounds,
    });
    
    // automatically update the instances of the two players that played the game
    try {
        const savedGame = await game.save();
        res.json(savedGame);
        // add game to the players involved
        const winnerId = mongoose.Types.ObjectId(req.body.winner_id);
        const loserId = mongoose.Types.ObjectId(req.body.loser_id);
        Player.findByIdAndUpdate(winnerId, {$push: { games: {
                game_id: savedGame.id,
                date: req.body.date,
                challenge: req.body.challenge,
                won: true,
                surrendered: req.body.surrendered,
                opponent_username: req.body.loser_name,
            }
        }, $inc : {games_won: 1}}, { useFindAndModify: false })
            .then(player => {
                if (!player) {
                    res.status(404).send({
                        message: `Cannot update player with id=${winnerId}. Maybe Player was not found!`
                    });
                } 
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                message: "Error updating Player with id=" + winnerId,
            });
        });

        Player.findByIdAndUpdate(loserId, {$push: { games: {
                game_id: savedGame.id,
                date: req.body.date,
                challenge: req.body.challenge,
                won: false,
                surrendered: req.body.surrendered,
                opponent_username: req.body.winner_name,
            }
        },$inc : {games_lost: 1}}, { useFindAndModify: false })
            .then(player => {
                if (!player) {
                    res.status(404).send({
                        message: `Cannot update player with id=${loserId}. Maybe Player was not found!`
                    });
                } 
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                message: "Error updating Player with id=" + loserId,
            });
        });    

    } catch(err) {
        console.log(err);
        res.json({message: err});
    }
});

// delete a specific game
router.delete('/deleteGame/:gameId', (req,res) => {
    Player.findByIdAndRemove(mongoose.Types.ObjectId(req.params.game), {useFindAndModify: false}, (err, game) => {
        // handle any potential errors:
        if (err) return res.status(500).send(err);
        // Create a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "Game successfully deleted",
            id: game._id
        };
        return res.status(200).send(response);
    });
});

module.exports = router;