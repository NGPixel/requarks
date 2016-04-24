var express = require('express');
var router = express.Router();

/*
 * CREATE - Select category
 */
router.get('/', function(req, res, next) {

	db.Category.findAll({
		order: 'name'
	}).then(function(cats) {
		res.render('create/create', { navbar_active: 'create', page_script: 'create', categories: cats });
	});

});

/*
 * CREATE - Form
 */
router.get('/:id', function(req, res, next) {
  res.render('create/create-form', { navbar_active: 'create', page_script: 'create' });
});

module.exports = router;
