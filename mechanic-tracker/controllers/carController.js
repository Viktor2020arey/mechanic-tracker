const Car = require("../models/Car");

exports.createCar = async (req, res) => {
  try {
    const { plateNumber, brand, model, year } = req.body;
    const newCar = await Car.create({
      mechanic: req.user.id,
      plateNumber,
      brand,
      model,
      year,
    });
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyCars = async (req, res) => {
  try {
    const cars = await Car.find({ mechanic: req.user.id });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
