const User = require('../models/User');
const { generateTokens, verifyRefreshToken } = require('../utils/jwtUtils');
const jwt = require('jsonwebtoken');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExist = await User.findOne({ email });

        if (userExist) {
            res.status(400);
            throw new Error('User already exist');
        }

        // Create user
        const user = await User.create({ name, email, password });

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // Set refresh token as HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: PerformanceObserverEntryList.env.NODE_ENV == 'production',
            sameSite: 'strict',
        })

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                accessToken
            }
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Logs in a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(':::::::::::::;;;email : ', email);

        // Check for user exist
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            res.status(404)
            throw new Error("No user found with given email");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401)
            throw new Error("Invalid credentials");
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // Set refresh token as HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: PerformanceObserverEntryList.env.NODE_ENV == 'production',
            sameSite: 'strict',
        })

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                accessToken
            }
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Refreshes access token using refresh token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            res.status(401);
            throw new Error("No refresh token provided");
        }

        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken);

        // Find user
        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(400)
            throw new Error("User not found");
        }

        // Generate new access token
        const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        res.status(200).json({
            state: 'success',
            data: {
                accessToken
            }
        })
    } catch (error) {
        res.status(401)
        throw new Error("Invalid refresh token");

    }
}

/**
 * Logs out a user by clearing cookies
 * @param {Object} res - Express request object
 * @param {Object} res - Express response object
 */
const logout = async (res) => {
    res.clearCookies('refreshToken')

    res.status(201).json({
        status: 'success',
        message: 'Logout successfully'
    });
}

/**
 * Get user data from token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getMe = async (req, res, next) => {
    try {
        res.status(200).json({ data: req.user })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    logout,
    getMe
}