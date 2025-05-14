const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const { authenticateUser, checkRefreshToken } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/check-session', checkRefreshToken, authController.checkSession);
router.get('/me', authenticateUser, authController.getMe);

// Google OAuth routes
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);

module.exports = router;