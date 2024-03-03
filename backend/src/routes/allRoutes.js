const express = require('express');
const authCheck = require("../middlewares/authCheck.js")
const authRoute = require("./auth.route.js")
const dashboardRoute = require("./dashboard.route.js")

const router = express.Router();

router.get("/", authCheck, (req, res) => {
    res.send("Welcome to my website")
})
router.use("/user", authRoute)
router.use("/dashboard", dashboardRoute)

module.exports = router;