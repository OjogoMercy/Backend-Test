require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

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
const emailExists = users.find((user) => user.email === email);
app.post("/register", (req, res) => {
  const { userName, email, password } = req.body;
  const emailExists = users.find((user) => user.email === email);
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields " });
  } else if (emailExists) {
    return res.status(409).json({ message: "This email already exists" });
  } else {
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        return res.status(500).json({ message: "Error hashing the password" });
      }
      users.push({ userName, email, password: hash });
      return res.status(201).json({ message: "User registered successfully" });
    });
  }
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  const foundUser = users.find((user) => user.email === email);
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  bcrypt.compare(password, foundUser.password, (error, match) => {
    if (error) {
      return res.status(500).json({ message: "An error occurred" });
    }
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(200).json({ message: "Login successful" });
  });
});
app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
