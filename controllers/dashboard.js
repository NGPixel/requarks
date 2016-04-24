var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('dashboard/dashboard', {
		usr: res.locals.usr,
  		navbar_active: 'dashboard'
	});
});

module.exports = router;
