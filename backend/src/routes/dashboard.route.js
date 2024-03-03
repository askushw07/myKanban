const router = require("express").Router();
const boardRouter = require("./board.route.js")
const homepageData = require("../controllers/dashboardHome.controller.js")
const profileRoute = require("./profile.route.js")


router.get("/", (req, res) => {
    res.send("welcome to dashboard page");
})

router.get("/home", homepageData);
router.use("/board", boardRouter);
router.use("/profile", profileRoute);

module.exports  =router