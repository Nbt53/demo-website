const express = require('express');
const router = express.Router();
const info = require('../controllers/info')
const { isLoggedIn, isAdmin } = require('../middlewear.js');
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(catchAsync(info.home))

router.route('/pricing')
    .get(isLoggedIn ,isAdmin, info.pricing)

router.route('/about')
    .get(info.about)

module.exports = router