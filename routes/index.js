const express = require("express");

const router = express.Router();

const driver = require("./driver");
const passenger = require("./passenger");
const bot = require("./bot");

router.use("/drivers", driver);
router.use("/passengers", passenger);
router.use("/botmessages", bot);

router.get("/alive", (req, res) => res.status(200).send("alive"));

module.exports = router;
