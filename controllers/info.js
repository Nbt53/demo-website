const Art = require("../models/art")
const User = require("../models/users")
const Contact = require("../models/contact")
const { transporter, sendMail } = require("../nodemailer/nodemailer")


module.exports.home = async (req, res) => {
    const art = await Art.find({})
    res.render('info/home', { art })
}

module.exports.services = (req, res) => {
    res.render('info/services')
}

module.exports.about = (req, res) => {
    res.render('info/about')
}

module.exports.admin = async (req, res) => {
    const art = await Art.find({})
    const users = await User.find({})
    res.render('admin', { art, users })
}

module.exports.updateUser = async (req, res) => {
    let { username, email, admin, _id, basket } = req.body
    if (!admin) {
        admin = 'off'
    }
    _id = _id.replace(/\s+/g, '');
    const updated = { username, email, admin, basket }
    await User.findByIdAndUpdate(_id, { ...updated })
    res.redirect('/admin')
}

module.exports.sendForQuote = async (req, res) => {
    const { name, email, description } = req.body;
    let file = await req.files.map(f => ({ url: f.path, filename: f.filename }))
   // sendMail(name, email, description, file[0].url, file[0].name)
    const contact = new Contact(req.body)
    contact.image = file
    await contact.save()
    req.flash('success', 'Request sent')
    res.redirect('/services')
}