const express = require('express');
const router = express.Router();
const art = require('../controllers/art');
const { isLoggedIn, isAdmin, marker } = require('../middlewear');
const multer = require('multer')
const { storage } = require('../cloudinary');
const catchAsync = require('../utils/catchAsync');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(art.index))

router.route('/new')
    .get(isLoggedIn, isAdmin, art.newForm)
    .post(isLoggedIn, isAdmin, upload.array('image'), catchAsync(art.submitNew))

router.route('/:id')
    .get(catchAsync(art.show))
    .delete(isLoggedIn, isAdmin, catchAsync(art.delete))

router.route('/:id/edit')
    .get(isLoggedIn, isAdmin, catchAsync(art.edit))
    .put(isLoggedIn, isAdmin, catchAsync(art.editPost))

module.exports = router   