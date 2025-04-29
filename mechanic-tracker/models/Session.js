const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  mechanic: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startTime: Date,
  endTime: Date,
  comment: String,
  status: {
    type: String,
    enum: ["active", "paused", "stopped"],
    default: "active",
  },
});

module.exports = mongoose.model("Session", sessionSchema);
