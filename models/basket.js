const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BasketSchema = new Schema({
    type: String,
    itemUrl: String,
    price: Number,
    qty: Number
});

module.exports = mongoose.model('Basket', BasketSchema)