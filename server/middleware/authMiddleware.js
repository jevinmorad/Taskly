const { verifyAccessToken, verifyRefreshToken } = require('../utils/jwtUtils');

/**
 * Verify refresh token (from cookies)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const checkRefreshToken = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            req.noSession = true;// No session exists
            return next();
        }

        const decoded = verifyRefreshToken(refreshToken);

        req.id = decoded.id;
        next();
    } catch (error) {
        res.status(401)
        if (error.name === 'TokenExpiredError') {
            throw new Error("Refresh token expired");
        }
        next(error)
    }
}

/**
 * Middleware to authenticate user using JWT access token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticateUser = (req, res, next) => {
    try {
        // Get token from authorization header
        const authHeader = req.header.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
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
        if (error.name === 'TokenExpiredError') {
            throw new Error("Access token expired");
        }
        next(error);
    }
}

module.exports = {
    authenticateUser,
    checkRefreshToken,
}