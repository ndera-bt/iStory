const express = require('express');

const router = express.Router();
const authController = require('../controller/auth');

// POST: endpoint for user signup 
router.post('/signup', authController.signup);

// POST: endpoint for user login
router.post('/login', authController.login);

module.exports = router;