const mongoose = require("mongoose");

const DriverSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  address: { type: String },
  city: { type: String },
  licensePlate: { type: String },
  photoIdUrl: { type: String },
  numOfPassengers: { type: Number },
  phone: { type: String },
  destination: { type: String },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
});

DriverSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Driver", DriverSchema);
