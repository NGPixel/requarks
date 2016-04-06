var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		usr: res.locals.usr,
  		navbar_active: 'dashboard'
	});
});

module.exports = router;
