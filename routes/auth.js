const express = require('express');

const router = express.Router();
const authController = require('../controller/auth');

// endpoint for signup 
router.post('/signup', authController.signup);

// endpoint for login
router.post('/login', authController.login);

module.exports = router;