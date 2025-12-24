const jwt = require('jsonwebtoken');

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")
    if (!token) {
        return res.status(401).send("Access Denied due to invalid Credentials")
        try {
            const Verified = jwt.verify(token, process.env.JWT_SECRET);
        req.User = Verified;
        next();
        } catch (err) {
            res.status(401|| 500).send("Invalid Token")
       }
    }
} 