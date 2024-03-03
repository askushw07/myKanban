// auth.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to home or another page
        res.redirect('/api/v1/dashboard');
    });

module.exports = router;
