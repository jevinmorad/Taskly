const User = require('../models/User');
const { generateToken } = require('../config/jwt');

// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public
const signupUser = async (req, res, next) => {
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

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
}

// @desc   Authenticate a user
// @route  POST /api/auth/login
// @access Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }

    } catch (error) {
        next(error);
    }
}

// @desc   Get user data
// @route  GET /api/auth/me
// @access Private
const getMe = async (req, res, next) => {
    try {
        res.status(200).json({ data: req.user })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signupUser, loginUser, getMe
}