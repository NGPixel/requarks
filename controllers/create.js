var express = require('express');
var _ = require('lodash');
var router = express.Router();

/*
 * CREATE - Select category
 */
router.get('/', (req, res, next) => {

	db.Category.findAll({
		order: 'name'
	}).then(function(cats) {
		res.render('create/create', {
			navbar_active: 'create',
			page_script: 'create',
			categories: cats
		});
	});

});

/*
 * CREATE - Form
 */
router.get('/:id', (req, res, next) => {

	// Get category

	db.Category.findOne({
		where: { slug: req.params.id }
	}).then((cat) => {

		if(cat) {
			return { category: cat };
		} else {
			return Promise.reject(new Error('Invalid category'));
		}

	}).then((reqdata) => {

		// Get subcategories

		return db.SubCategory.findAll({
			where: { CategoryId: reqdata.category.id },
			order: 'sortIndex'
		}).then((subcats) => {
			
			if(subcats) {
				reqdata.subcategories = subcats;
				return reqdata;
			} else {
				return Promise.reject(new Error('Missing subcategory for this category. At least one required.'));
			}

		});

	}).then((reqdata) => {

		// Get Custom Fields

		return db.PropertyDefinition.findAll({
			where: {
				CategoryId: reqdata.category.id,
				isRestricted: false
			},
			order: 'sortIndex'
		}).then((cfields) => {
		
			reqdata.customfields = (cfields) ? cfields : [];
			return reqdata;

		});

	}).then((reqdata) => {

		// Get Category Info boxes

		return db.CategoryInfo.findAll({
			where: { 
				$or: [
					{ CategoryId: reqdata.category.id },
					{ CategoryId: null }
				]
			}
		}).then((ib) => {
		
			reqdata.infoboxes = (ib) ? _.map(ib, (i) => { return i.get(); }) : [];
			return reqdata;

		});

	})
	.then((reqdata) => {

		res.render('create/create-form', {
			navbar_active: 'create',
			page_script: 'create',
			reqdata
		});

	}).catch(next);

});

/**
 * CREATE - Submit
 */
router.post('/:id', (req, res, next) => {

	res.send('');

});

module.exports = router;
