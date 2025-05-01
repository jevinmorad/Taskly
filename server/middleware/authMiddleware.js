const User = require('../models/User');
const { verifyToken } = require('../config/jwt');

// Protect routes - user must be logged in
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decode = verifyToken(token);

            // Get user from token
            const user = await User.findById(decode.id);

            next();
        } catch (error) {
            console.error(error);
            res.status(401)
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}

module.exports = { protect }