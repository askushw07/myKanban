const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user.model.js")
const createAvatar = require("../utils/createAvtar.js")

passport.use(new GoogleStrategy({
    clientID: '467438587816-26hga8f56qui4up7d3p5m7brfdfs9pfu.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/api/v1/user//google/callback', // Adjust this based on your setup
}, (accessToken, refreshToken, profile, done) => {
    // You can save the user profile data to the database or use it for authentication
    // console.log(profile);

    User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (user) {
            // User found, log them in
            return done(null, user);
        } else {
            // Create a new user
            const newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: createAvatar()
            });

            newUser.save((err, savedUser) => {
                if (err) {
                    return done(err);
                }

                return done(null, savedUser);
            });
        }
    });

    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    // Serialize user data into session
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // Deserialize user data from session
    done(null, user);
});

module.exports = passport;