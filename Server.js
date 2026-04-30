require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const PORT = process.env.PORT || 3000;
// to handle form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const users = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "index.html"));
});

app.get(/\/Views\/newPage(\.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "newPage.html"));
});
app.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const emailExists = users.find((user) => user.email === email);

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    } else if (emailExists) {
      return res.status(409).json({ message: "This email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    users.push({ id: uuid(), userName, email, password: hashPassword });
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
    const foundUser = users.find((user) => user.email === email);
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

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
