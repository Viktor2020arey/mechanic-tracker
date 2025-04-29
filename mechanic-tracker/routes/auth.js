const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Реєстрація
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Чи існує користувач?
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Користувач уже існує" });

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "Користувача створено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера", error: err.message });
  }
});

// Логін
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Перевірка користувача
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Невірна пошта або пароль" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Невірна пошта або пароль" });

    // Створення токена
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера", error: err.message });
  }
});

module.exports = router;
