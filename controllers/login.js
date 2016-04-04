var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login', function(req, res, next) {
	res.render('auth/login');
});

router.get('/unauthorized', function(req, res, next) {
	res.render('auth/unauthorized');
});

router.get('/auth_callback',
  passport.authenticate('auth0', { failureRedirect: '/unauthorized' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/");
  }
);

module.exports = router;
