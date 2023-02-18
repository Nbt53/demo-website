const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'lovebird',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

const storage2 = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'quotes',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

module.exports = {
    cloudinary,
    storage,
    storage2
}