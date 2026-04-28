const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/google/callback', authController.googleCallback);
router.post('/apple/callback', authController.appleCallback);
router.get('/session', authenticate, authController.getSession);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;
