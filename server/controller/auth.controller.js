const User = require('../models/User');
const { generateTokens, verifyRefreshToken } = require('../utils/jwtUtils');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

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
            const { accessToken } = generateTokens(userExist);

            return res.status(200).json({
                user: {
                    id: userExist._id,
                    name: userExist.name,
                    email: userExist.email
                },
                accessToken,
            })
        }

        // Create user
        const user = await User.create({ name, email, password });

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // Set r refresh token as HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production ',
            sameSite: 'strict',
        })

        res.status(200).json({
            status: 'success',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken,
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
            secure: process.env.NODE_ENV == 'production',
            sameSite: 'strict',
        })

        res.status(200).json({
            status: 'success',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken,
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Logs out a user by clearing cookies
 * @param {Object} res - Express request object
 * @param {Object} res - Express response object
 */
const logout = async (req, res) => {
    res.clearCookie('refreshToken')

    res.status(201).json({
        status: 'success',
        message: 'Logout successfully'
    });
}

/**
 * Refreshes access token using refresh token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
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
            accessToken,
        })
    } catch (error) {
        res.status(401)
        next(error)
    }
}

/**
 * Check if the user has created any session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const checkSession = async (req, res, next) => {
    try {
        if (req.noSession) {
            return res.status(200).json({ user: null })
        }

        const user = await User.findById(req.id)

        if (!user) {
            res.status(404)
            throw new Error('User not found');
        }

        const { accessToken } = generateTokens(user);

        res.status(200).json({
            success: true,
            user,
            accessToken,
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Handle google authentication
 */
const googleAuth = passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
})

/**
 * Handle google authentication callback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', (err, user) => {
        if (err) return next(err);
        if (!user.user) return res.redirect('/auth/login');

        console.log("Refresh token: ", user.refreshToken);


        res.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production ',
            sameSite: 'strict',
        })

        res.redirect(`${process.env.CLIENT_URL}`)
    })(req, res, next)
}

/**
 * Get the current authenticated user's profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getMe = async (req, res, next) => {
    try {
        // Find user by ID (from authenticated request)
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            res.state(404)
            throw new Error("User not found");
        }

        res.status(200).json({
            status: 'success',
            user,
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    logout,
    refreshToken,
    checkSession,
    googleAuth,
    googleAuthCallback,
    getMe,
}