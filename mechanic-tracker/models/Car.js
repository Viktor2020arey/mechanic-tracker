const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  mechanic: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plateNumber: String,
  brand: String,
  model: String,
  year: Number,
});

module.exports = mongoose.model("Car", carSchema);
