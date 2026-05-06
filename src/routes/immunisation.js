const express = require("express");
const router = express.Router();
const prisma = require("../../prismaClient");
const verifyToken = require("./authRoutes");

router.post("/Immunisation", verifyToken, async (req, res) => {
  try {
    const { vaccineId, administeredDate, childId } = req.body;
    if (!vaccineId || !administeredDate || !childId) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const child = await prisma.child.findFirst({
      where: { id: childId, userId: req.user.userId },
    });
    if (!child) {
      return res.status(403).json({ message: "child not found" });
    }
    const newImmunisation = await prisma.immunisation.create({
      data: {
        vaccineId,
        administeredDate: administeredDate ? new Date(administeredDate) : null,
        childId: childId,
        administered: true,
      },
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

router.get(
  "/children/:childId/immunisations",
  verifyToken,
  async (req, res) => {
    try {
      const { childId } = req.params;
      const child = await prisma.child.findFirst({
        where: {
          id: childId,
          userId: req.user.userId,
        },
      });
      if (!child) {
        return res.status(403).json({ message: "access denied" });
      }
      const immunisations = await prisma.immunisation.findMany({
        where: { childId },
      });
      return res
        .status(200)
        .json({ message: "list of immunisations", immunisations });
    } catch (error) {
      console.error("error message", error);
      return res.status(500).json({ message: "server error" });
    }
  },
);
router.delete("/immunisation/:immunisationId", verifyToken,async (req,res) =>{
  try{
    const {immunisationId}   = req.params;
    const immunisation = await prisma.immunisation.findFirst({
      where:{
        id:immunisationId,
        userId:req.user.userId
      }
    })
    if(!immunisation){
      return res.status(403).json({message:"Access denied"})
    }
    await prisma.immunisation.delete({
      where:{
        id:immunisationId,
      }
    })
    return res.status(204).send();
  }catch(error){
    console.error("error message", error);
    return res.status(500).json({ message: "server error" });
  }
})
router.patch("/immunisation/:immunisationId", verifyToken,async (req,res) =>{
  try{
    const {immunisationId} = req.params;
    const { administered } = req.body;
 const existingChild = await prisma.child.findFirst({
  where:{
    id:immunisationId,
    child:{
      userId:req.user.userId
    }
  }
 })
 if(!existingChild){
  return res.status(404).json({message:"Child does not exist"})
 }
 const updatedChild = await prisma.child.update({
  where:{id:immunisationId},
  data:{administered:administered}
 })
 return res.status(200).json({message:"Immunisation updated successfully", immunisation:updatedChild})
  }catch(error){
    console.error("error message", error);
    return res.status(500).json({ message: "server error" });
  }
})

module.exports = router;
