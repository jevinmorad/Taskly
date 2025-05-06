const { verifyAccessToken } = require('../utils/jwtUtils');

/**
 * Middleware to authenticate user using JWT access token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticateUser = (req, res, next) => {
    try {
        // Get token from authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401);
            throw new Error("No token provided");
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = verifyAccessToken(token);

        // Attach user to request object
        req.user = { ...decoded }
        next();

    } catch (error) {
        res.status(401);
        throw new Error("Not authorized to access this route");
    }
}

module.exports = { authenticateUser }