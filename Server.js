require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const prisma = require("./prismaClient");

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "index.html"));
});

app.get(/\/Views\/newPage(\.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "newPage.html"));
});
app.post("/register", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "NO token provided" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.error("Server Error", error);
    return res.status(401).json({ message: "Token error" });
  }
};
app.get("/Views/index.html", verifyToken, (req, res) => {
  res.json({ user: req.user, message: "You have access to this file" });
});
app.post("/Children", verifyToken, async (req, res) => {
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
app.post("/Immunisation", verifyToken, async (req, res) => {
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

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
