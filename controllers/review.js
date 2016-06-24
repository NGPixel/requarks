var express = require('express');
var router = express.Router();
var _ = require('lodash');

/*
 * Review
 */
router.get('/', (req, res, next) => {

	db.Category.find({})
	.select({
		name: 1,
		color: 1,
		icon: 1,
		statuses: 1,
		types: 1,
		subCategories: 1
	})
	.exec().then((cats) => {

		return _.map(cats, (c) => {
			return c.toObject({ transform: db.common.stringifyIds });
		});

	}).then((cats) => {

		res.render('review/review', {
			navbar_active: 'review',
			page_script: 'review',
			cats
		});

		return true;

	}).catch(next);

});

module.exports = router;
