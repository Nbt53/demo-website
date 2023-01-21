const User = require('../models/users')


module.exports.signup = (req, res) => {
    res.render('user/signup')
}

module.exports.login = (req, res) => {
    const { username, password } = req.body
    res.render('user/login')
}

module.exports.signupPost = async (req, res, next) => {
  
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success','user created')
            res.redirect('/')
        })

    } catch (e) {
        console.log(e)
        res.redirect('/signup')
    }
  
}

module.exports.loginPost = async (req, res) => {
    req.flash('success', 'Welcome back')
    res.redirect('/')
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
}
