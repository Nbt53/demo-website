const express = require('express');
const basket = require('../controllers/basket');
const { isLoggedIn } = require('../middlewear');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.route('/')
    .get(isLoggedIn , catchAsync(basket.index))
    .put(isLoggedIn ,catchAsync(basket.addToBasket))


module.exports = router    