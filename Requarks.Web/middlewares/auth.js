module.exports = function(req, res, next) {
  if (req.baseUrl != '/login' && !req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.locals.authusr = req.user;
  next();
}