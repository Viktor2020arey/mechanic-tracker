const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./mechanic-tracker/config/db");
const authRoutes = require("./mechanic-tracker/routes/authRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const carRoutes = require("./mechanic-tracker/routes/carRoutes");
const sessionRoutes = require("./mechanic-tracker/routes/sessionRoutes");

app.use("/api/cars", carRoutes);
app.use("/api/sessions", sessionRoutes);

require("dotenv").config();

const authRoutes = require("./routes/auth");
app.use(express.json());
app.use("/api/auth", authRoutes);
