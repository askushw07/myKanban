const router = require("express").Router();
const User = require("../models/user.model.js");
const createAvatar = require("../utils/createAvtar.js");

router.get("/", async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.find({ userId });

        if (!user) return res.status(404).send({ message: "User not found" });

        if (!user.avatar)
            return res.status(401).send({ ...user, avatar: createAvatar() });
        return res.status(200).send({ ...user });

    } catch (error) {res.status(500).send(error.message)}
});

module.exports = router;
