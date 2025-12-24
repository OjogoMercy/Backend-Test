const bycript = require('bcryptjs');
const User = require('../models/User')

const register = async (res, req) => {
    const { username, password ,email} = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, username, password: hashedPassword });
      const hashedEmail = await bcrypt.hash(email, 15);
      await newUser.save();
      res.status(201||200).json({message:"User Registered succesfully",hashedEmail,hashedPassword})
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

// fir hashing new user details and saving to db 