require("dotenv").config();
const express = require("express");
const router = express.Router()
const prisma = require("./prismaClient");
const verifyToken = require("./authRoutes")

router.post("/Immunisation", verifyToken, async (req, res) => {
  try {
  const { vaccineName, dueDate, childId } = req.body;
     if (!vaccineName || !dueDate || !childId) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const child = await prisma.child.findFirst({
      where: { id: childId, userId: req.user.userId },
    });
    if (!child) {
      return res.status(404).json({ message: "child not found" });
    }   
    const parsedDueDate = new Date(dueDate);
    const newImmunisation = await prisma.immunisation.create({
      data: {  vaccineName,
      dueDate: parsedDueDate,
      childId: childId,}
    });
    return res.status(201).json({
      message: "Immunisation created successfully",
      immunisation: newImmunisation,
    });
  } catch (error) {
    console.error("error messsage", error);
    return res.status(500).json({ message: "server error" });
  }
});
module.exports = router;