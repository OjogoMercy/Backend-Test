const express = require("express");
const router = express.Router();
const prisma = require("../../prismaClient");
const verifyToken = require("../middleware/auth");

router.post("/GrowthRecord", verifyToken, async (req, res, next) => {
  try {
    const { height, weight, childId, date } = req.body;
    const missingField = [];
    if (!height) missingField.push("height required");
    if (!weight) missingField.push("weight required");
    if (!childId) missingField.push("childId required");

    if (missingField.length > 0) {
      return res
        .status(400)
        .json({ message: `Please fill in ${missingField.join(", ")}` });
    }
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: req.user.userId,
      },
    });
    if (!child) {
      return res.status(403).json({ message: "child not found" });
    }
    const newGrowthRecord = await prisma.growthRecord.create({
      data: {
        weight: parseFloat(weight),
        height: parseFloat(height),
        date: new Date(date),
        childId: childId,
      },
    });
    return res.status(201).json({
      message: "Growth record created successfully",
      growthRecord: newGrowthRecord,
    });
  } catch (error) {
    next(error);
  }
});
router.delete(
  "/growthRecord/:growthRecordId",
  verifyToken,
  async (req, res, next) => {
    try {
      const { growthRecordId } = req.params;
      const growthRecord = await prisma.growthRecord.findFirst({
        where: {
          id: growthRecordId,
          userId: req.user.userId,
        },
      });
      if (!growthRecord) {
        return res.status(403).json({ message: "Record not found" });
      }
      await prisma.growthRecord.delete({
        where: {
          id: growthRecordId,
        },
      });
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
