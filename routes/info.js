const express = require('express');
const router = express.Router();
const info = require('../controllers/info')
const { isLoggedIn, isAdmin } = require('../middlewear.js');
const catchAsync = require('../utils/catchAsync');
const { storage } = require('../cloudinary');
const multer = require('multer')
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(info.home))

router.route('/services')
    .get(info.services)
    .post(upload.array('image'), catchAsync(info.sendForQuote))

router.route('/about')
    .get(info.about)

router.route('/admin')
    .get(isLoggedIn, isAdmin, catchAsync(info.admin))
    .put(isLoggedIn, isAdmin, catchAsync(info.updateUser))

router.route('/requests')
    .get(isLoggedIn, isAdmin, catchAsync(info.requestsIndex))

router.route('/requests/:id')
    .get(isLoggedIn, isAdmin, catchAsync(info.showRequest) )
    .delete(isLoggedIn, isAdmin, catchAsync(info.deleteRequest) )

module.exports = router