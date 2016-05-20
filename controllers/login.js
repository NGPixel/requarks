'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();

/**
 * Login
 */
router.get('/login', (req, res, next) => {
	res.render('auth/login');
});

/**
 * Unauthorized
 */
router.get('/unauthorized', (req, res, next) => {
	res.render('auth/unauthorized');
});

/**
 * Authentication callback
 */
router.get('/auth_callback',
  passport.authenticate('auth0', { failureRedirect: '/unauthorized' }),
  (req, res) => {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/");
  }
);

/**
 * Logout
 */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.clearCookie('connect.sid');
  req.session.destroy();
  delete req.session;
  return res.redirect('/');
});

module.exports = router;