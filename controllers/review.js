var express = require('express');
var router = express.Router();

/*
 * CREATE - Select category
 */
router.get('/', (req, res, next) => {

	res.redirect('/review/technical');

});

/* GET home page. */
router.get('/:id', function(req, res, next) {

	db.common.getCategory({
		slug: req.params.id,
		includeSubCats: true
	}).then((reqdata) => {

		res.render('review/review', {
			navbar_active: 'review',
			page_script: 'review',
			reqdata
		});

		return true;

	}).catch(next);

});

module.exports = router;
