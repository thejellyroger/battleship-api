const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

// use the Strategy
passport.use(
    new GoogleStrategy({
        // options for the Google Strategy
    }), () => {
        // passport callback function
    })
)