require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const prisma = require("./prismaClient");
const immunisationRoutes = require("./src/routes/immunisation")
const childrenRoutes = require("./src/routes/Children");
const growthRoutes = require("./src/routes/growthRecord")
const authRoutes = require("./src/routes/authRoutes")

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(immunisationRoutes,growthRoutes,authRoutes,childrenRoutes)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "index.html"));
});

app.get(/\/Views\/newPage(\.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "newPage.html"));
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



app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
