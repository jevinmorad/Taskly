const jwt = require('jsonwebtoken');

/**
 * Generate JWT token (access and refresh)
 * @param {Object}  user - User object containing at least id and email
 * @returns {Object} Contains accessToken and refreshToken
 */
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '30d' }
    )

    return { accessToken, refreshToken }
}

/**
 * Verify JWT access token
 * @param {String} token - JWT access token
 * @returns {Object} Decoded token payload if valid
 * @throws {Error} If token is invalid or expired
 */
const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

/**
 * Verify JWT refresh token
 * @param {String} token - JWT refresh token
 * @returns {Object} Decoded token payload if valid
 * @throws {Error} If token is invalid or expired
 */
const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
    generateTokens,
    verifyAccessToken,
    verifyRefreshToken,
}