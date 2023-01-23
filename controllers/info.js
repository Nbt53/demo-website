const Art = require("../models/art")


module.exports.home = async(req, res) => {
    const art = await  Art.find({})
    res.render('info/home', {art})
}

module.exports.pricing = (req, res) =>{
    res.render('info/pricing')
}

module.exports.about = (req, res) =>{
    res.render('info/about')
}