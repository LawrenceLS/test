function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/admin/login');
}

module.exports = { ensureAuthenticated };
