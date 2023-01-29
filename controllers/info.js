const Art = require("../models/art")
const User = require("../models/users")


module.exports.home = async (req, res) => {
    const art = await Art.find({})
    res.render('info/home', { art })
}

module.exports.pricing = (req, res) => {
    res.render('info/pricing')
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
    let { username, email, admin, _id , basket} = req.body
    if(!admin){
        admin= 'off'
    }
    _id = _id.replace(/\s+/g, '');
    const updated = { username, email, admin, basket }
    await User.findByIdAndUpdate(_id, { ...updated })
    res.redirect('/admin')
}