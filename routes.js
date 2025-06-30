const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/auth');
const auth = require('../middlewares/auth');

// @route   POST api/auth/signup
// @desc    Register user
router.post(
    '/signup',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    authController.signup
);

// @route   POST api/auth/login
// @desc    Login user
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    authController.login
);

// @route   GET api/auth/user
// @desc    Get user data
router.get('/user', auth, authController.getUser);

module.exports = router;