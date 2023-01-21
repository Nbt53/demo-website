
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
    // take just the _id
const user = res.locals.currentUser._id.toHexString()
    if ('63c941eafe89411ec5ebc81c' != user) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect('/');
    }
    next()

}
module.exports.isAdmin = isAdmin;