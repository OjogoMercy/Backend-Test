const express = require("express");
const router = express.Router();
const prisma = require("../../prismaClient");
const verifyToken = require("../middleware/auth");

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

router.get("/Children", verifyToken,async (req,res) =>{
    try{
const children = await prisma.child.findMany({
    where:{
        userId:req.user.userId
    }
})
return res.status(200).json({message:"List of Children:", children})
    }catch(error){
        console.error("error message", error)
        return res.status(500).json({message:"server error"})
    }
})
router.get("/children/:childId/growthRecords", verifyToken, async (req, res) => {
    try {
        const { childId } = req.params;

        const child = await prisma.child.findFirst({
            where: {
                id: childId,
                userId: req.user.userId
            }
        });
        if (!child) {
            return res.status(403).json({ message: "Access denied" });
        }

        const growthRecords = await prisma.growthRecord.findMany({
            where: { childId }
        });

        return res.status(200).json({ message: "Growth records:", growthRecords });

    } catch (error) {
        console.error("Error message", error);
        return res.status(500).json({ message: "server error" });
    }
});
module.exports = router