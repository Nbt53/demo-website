const express = require('express');
const router = express.Router();
const info = require('../controllers/info')
const { isLoggedIn, isAdmin } = require('../middlewear.js');
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(catchAsync(info.home))

router.route('/services')
    .get(info.services)

router.route('/about')
    .get(info.about)

router.route('/admin')
    .get(isLoggedIn, isAdmin, catchAsync(info.admin))
    .put(isLoggedIn, isAdmin, catchAsync(info.updateUser))

module.exports = router