const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/get', (req, res) => { res.send('Request got') })
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/me', authenticateUser, authController.getMe);

module.exports = router;