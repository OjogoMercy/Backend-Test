const bycript = require('bcryptjs');
const User = require('../models/User')

const register = async (res, req) => {
    const { username, password ,email} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        const hashedEmail = await bcrypt.hash(email, 15)
    }
}