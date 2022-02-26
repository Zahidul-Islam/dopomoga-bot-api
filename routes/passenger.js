const express = require("express");
const router = express.Router();

const Passenger = require("../models/passenger");

router
  .get("/", async (req, res) => {
    const passengers = await Passenger.find();
    return res.status(200).json(passengers);
  })
  .post("/", async (req, res) => {
    try {
      const passenger = await Passenger.create(req.body);
      return res.status(200).json(passenger);
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  })
  .put("/:id", async (req, res) => {
    const passenger = await Passenger.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { $upsert: true, new: true }
    );

    res.status(200).json(passenger);
  })
  .get("/:id", async (req, res) => {
    const passenger = await Passenger.findById(req.params.id);
    res.status(200).json(passenger);
  });

module.exports = router;
