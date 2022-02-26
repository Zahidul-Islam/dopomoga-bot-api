const express = require("express");
const router = express.Router();

const Driver = require("../models/driver");

router
  .get("/", async (req, res) => {
    const drivers = await Driver.find();
    console.log("====", drivers);
    return res.status(200).json(drivers);
  })
  .post("/", async (req, res) => {
    try {
      const driver = await Driver.create(req.body);
      return res.status(200).json(driver);
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  })
  .put("/:id", async (req, res) => {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { $upsert: true, new: true }
    );

    res.status(200).json(driver);
  })
  .get("/:id", async (req, res) => {
    const driver = await Driver.findById(req.params.id);
    res.status(200).json(driver);
  });

module.exports = router;
