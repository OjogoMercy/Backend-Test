require("dotenv").config();


const jwt = require("jsonwebtoken");



export const verifyToken = (req, res, next) => {
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