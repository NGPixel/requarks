var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.user);
	res.render('index', {
		user: req.user,
  		navbar_active: 'dashboard'
	});
});

module.exports = router;
