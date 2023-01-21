const express = require('express');
const router = express.Router();
const art = require('../controllers/art');
const { isLoggedIn, isAdmin } = require('../middlewear');
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(art.index)

router.route('/new')
    .get( //isLoggedIn ,isAdmin, 
        art.newForm)
    .post( //isLoggedIn ,isAdmin,
         upload.array('image'), art.submitNew)

module.exports = router   