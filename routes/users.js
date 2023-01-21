const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Users = require('../models/users')
const { isLoggedIn } = require('../middlewear.js')
const catchAsync = require('../utils/catchAsync')


router.route('/signup')
    .get(users.signup)
    .post(catchAsync( users.signupPost))

router.route('/login')
    .get(users.login)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login',
        keepSessionInfo: true
    }), users.loginPost)

router.route('/logout')
    .get(users.logout)


module.exports = router