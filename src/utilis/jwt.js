const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Login = async(res, req) => {
    const { email, password } = req.body;
    const User = await User.findOne.({ email })
    if (
        User && (await bcrypt.compare(password, User.password))           
    ) {
        const token = jwt.sign({ id: User._id, }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.json({ token })
        
    } else {
        res.status(401).json ({message:"Invalid Details, pls provide the right thing or go away 😒"})
    }
}