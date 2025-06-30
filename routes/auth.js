const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authController = require('../../controllers/auth'); 
const authMiddleware = require('../../middlewares/auth'); 

// @route   POST /auth/signup
// @desc    Register new user
router.post(
    '/signup',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6+ characters').isLength({ min: 6 })
    ],
    authController.signup
);

// @route   POST /auth/login
// @desc    Authenticate user
router.post(
    '/login',
    [
        check('email', 'Valid email required').isEmail(),
        check('password', 'Password required').exists()
    ],
    authController.login
);

// @route   GET /auth/user
// @desc    Get current user data
router.get('/user', authMiddleware, authController.getUser);

module.exports = router;