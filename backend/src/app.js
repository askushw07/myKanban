const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const passport = require("./utils/auth.js");
const allroutes = require("./routes/allRoutes.js")

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(
    express.json({
        limit: "16kb",
    })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', allroutes); // Mount all routes

module.exports = app;
