function authCheck(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/v1/user/google'); // Redirect to login page if not authenticated
}

module.exports = authCheck