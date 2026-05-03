require("dotenv").config();
const express = require("express");
const app = express();
const prisma = require("./prismaClient");
const verifyToken = require("./verifyToken")

app.post("/GrowthRecord", verifyToken,async (req,res) =>{
  try{
  const {height,weight,date,childId} = req.body;

    if(!height || !weight || !date || childId){
      return res.status(400).json({message: "Please fill in all fields"});
    }
    const child = await prisma.child.findFirst({
      where:{
        id:childId,
        userId:req.user.userId
      }
    })
    if(!child){
      return res.status(403).json({message: "child not found"});
    }
    const newGrowthRecord = await prisma.growthRecord.create({
      data:{
        weight:parseFloat(weight),
        height:parseFloat(height),
        dateOfBirth:new Date(date),
        childId:childId
      }
    })
    return res.status(201).json({
      message: "Growth record created successfully",
      growthRecord: newGrowthRecord
    })
  }catch(error){
    console.error("error messsage", error);
    return res.status(500).json({ message: "server error" });
  }
})