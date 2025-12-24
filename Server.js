const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.post("/register", register);
app.post("/login", login);

app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome to your profile", userId: req.user.id });
});

app.listen(3000, () => console.log("Server running on port 3000"));
