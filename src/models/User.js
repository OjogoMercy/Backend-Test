// basic scheme for input fields

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: string, required: true, unique: true },
  password: { type: string, required: true },
  email: { type: string, required: true },
});
module.exports = mongoose.model("User", userSchema);
