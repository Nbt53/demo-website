module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
}


/// handles async errors by passing the error to the next function