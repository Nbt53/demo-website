const Art = require('../models/art')
const { cloudinary } = require('../cloudinary')

module.exports.index = async (req, res) => {
    const art = await Art.find({})
    console.log(art)
    res.render('art/index', { art })
}

module.exports.newForm = (req, res) => {
    res.render('art/new')
}

module.exports.submitNew = (req, res) => {
    const newArt = new Art(req.body.art)
    newArt.image = req.files.map(f => ({ url: f.path, filename: f.filename }))
    // res.send(newArt)
    newArt.save()
    req.flash('success', 'one art added')
    res.redirect('art/index')
}