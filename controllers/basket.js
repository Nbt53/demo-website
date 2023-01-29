const { session } = require("passport")
const Art = require("../models/art")
const User = require("../models/users")


module.exports.index = async (req, res) => {
    const { id } = req.user
    const user = await User.findById(id)
    const basket = []
    for (p of user.basket) {
        const art = await Art.findById(p)
        basket.push(art)
    }
    res.render('basket/index', { user, basket })
}

module.exports.addToBasket = async (req, res) => {
    const id = req.body.id
    let user = req.user._id.toHexString()
    newUser = await User.findById(user)
    newUser.basket.push(id)
    await newUser.save()
    console.log(newUser)

    res.redirect(`/art/${id}`)
}