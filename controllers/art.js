const Art = require('../models/art')
const { cloudinary } = require('../cloudinary')
const { findByIdAndUpdate } = require('../models/art')

module.exports.index = async (req, res) => {
    const art = await Art.find({})
    res.render('art/index', { art })
}

module.exports.newForm = (req, res) => {
    res.render('art/new')
}

module.exports.submitNew = (req, res) => {
    const newArt = new Art(req.body.art)
    newArt.image = req.files.map(f => ({ url: f.path, filename: f.filename }))
    newArt.save()
    req.flash('success', 'one art added')
    res.redirect('/art')
}

module.exports.show = async (req, res) => {
    const art = await Art.findById(req.params.id)
    res.render('art/show', { art })
}

module.exports.edit = async (req, res) => {
    const art = await Art.findById(req.params.id)
    res.render('art/edit', { art })
}

module.exports.editPost = async (req, res) => {
    const { id } = req.params
    await Art.findByIdAndUpdate(id, { ...req.body.art })
    req.flash('success', 'Details updated')
    res.redirect(`/art/${id}`)
}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    await Art.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted art')
    res.redirect('/art')
}