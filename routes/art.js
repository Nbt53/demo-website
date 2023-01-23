const express = require('express');
const router = express.Router();
const art = require('../controllers/art');
const { isLoggedIn, isAdmin } = require('../middlewear');
const multer = require('multer')
const { storage } = require('../cloudinary');
const catchAsync = require('../utils/catchAsync');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(art.index))

router.route('/new')
    .get(isLoggedIn, isAdmin, art.newForm)
    .post(isLoggedIn, isAdmin, upload.array('image'), art.submitNew)

router.route('/:id')
    .get(catchAsync(art.show))
    .delete(catchAsync(art.delete))

router.route('/:id/edit')
    .get(catchAsync(art.edit))
    .put(catchAsync(art.editPost))

module.exports = router   