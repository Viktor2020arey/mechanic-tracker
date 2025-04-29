const connectDB = require("./config/db");
connectDB();
const express = require("express");
const dotenv = require("dotenv");
//const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
//connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const carRoutes = require("./routes/carRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

app.use("/api/cars", carRoutes);
app.use("/api/sessions", sessionRoutes);
