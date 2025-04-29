const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { createCar, getMyCars } = require("../controllers/carController");

router.post("/", auth(["mechanic"]), createCar);
router.get("/", auth(["mechanic"]), getMyCars);

module.exports = router;
