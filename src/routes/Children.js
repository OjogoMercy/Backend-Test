require("dotenv").config();
const express = require("express");
const router = express.router();
const prisma = require("./prismaClient");
const verifyToken = require("./authRoutes")

router.post("/Children", verifyToken, async (req, res) => {
  try {
    const { name, dateOfBirth, gender } = req.body;
    if (!name || !dateOfBirth || !gender) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const parsedDOB = new Date(dateOfBirth);
    if (isNaN(parsedDOB.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const newChild = await prisma.child.create({
      data: {
        name,
        dateOfBirth: parsedDOB,
        gender,
        userId: req.user.userId,
      },
    });
    return res
      .status(201)
      .json({ message: "Child created successfully", child: newChild });
  } catch (error) {
    console.error("error messsage", error);
    return res.status(500).json({ message: "server error" });
  }
});
module.exports = router