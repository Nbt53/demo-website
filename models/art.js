const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: { virtuals: true } }

const artSchema = new Schema({
    title: String,
    price: Number,
    image: [imageSchema],
    description: String
}, opts)

artSchema.virtual('properties.PopUpMarkup').get(function () {
    return `<strong><a href="/art/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0,35)}...</p>`
})

module.exports = mongoose.model('Art', artSchema)