var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login', function(req, res, next) {
	res.render('login');
});

router.get('/auth_callback',
  passport.authenticate('auth0', { failureRedirect: '/error' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/");
  }
);

module.exports = router;
