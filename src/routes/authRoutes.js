require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("./prismaClient");


router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) {
      return res.status(409).json({ message: "This email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { userName, email, password: hashPassword },
    });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const foundUser = await prisma.user.findUnique({ where: { email } });
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;