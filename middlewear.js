
const isLoggedIn = (req, res, next) => {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    next();
}

module.exports.isLoggedIn = isLoggedIn;

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin != 'on') {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect('/');
    }
    next()

}

module.exports.isAdmin = isAdmin;

const marker = (req, res, next) =>{
    console.log('here')
    next()
}

module.exports.marker = marker;