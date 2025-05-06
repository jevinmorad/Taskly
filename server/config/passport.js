const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const MicrosoftStrategy = require('passport-microsoft');
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');