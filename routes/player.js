const router = require('express').Router();

router.get('/', (req, res) => {
    // retrieve all players
    res.json('all players'); 
});

router.get('/:id', (req,res) => {
    // lookup the user with that id
    res.json(req.params.id);
});

module.exports = router;