const router = require('express').Router();

// auth login
router.get('/login', (req,res) => {
    // call this from the app
    // I think it should prompt another view for the login service
    // and make use of the /google (or similar) route
    res.json("choose a serve to login");
});

// auth logout
router.get('/logout', (req,res) => {
    // call this from the app
    res.json('logging out');
});

// auth with google
router.get('/google', (req,res) => {
    // handle with passport
    res.json('logging with google');
});

module.exports = router;

