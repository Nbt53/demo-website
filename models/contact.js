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

const contactSchema = new Schema({
    name: String,
    email: String,
    image: [imageSchema],
    description: String
}, opts)

contactSchema.virtual('properties.PopUpMarkup').get(function () {
    return `<strong><a href="/contact/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0,35)}...</p>`
})

module.exports = mongoose.model('Contact', contactSchema)