"use strict";

var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();

/*
 * CREATE - Select category
 */
router.get('/', (req, res, next) => {

	db.Category.findAll({
		order: 'name'
	}).then((cats) => {
		res.render('create/create', {
			navbar_active: 'create',
			page_script: 'create',
			categories: cats
		});
		return true;
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

		return true;

	}).catch(next);

});

/**
 * CREATE - Submit
 */
router.post('/:id', (req, res, next) => {

	//-> Get category

	db.Category.findOne({
		where: { slug: req.params.id },
		include: [
			{ model: db.Type, as: 'defaultType', attributes: ['id'] },
			{ model: db.Status, as: 'defaultStatus', attributes: ['id'] },
			{ model: db.Priority, as: 'defaultPriority', attributes: ['id'] }
		]
	}).then((cat) => {

		if(cat) {
			return { category: cat };
		} else {
			return Promise.reject(new Error('Invalid category'));
		}

	}).then((reqdata) => {

		//-> Get subcategories

		return db.SubCategory.findAll({
			attributes: ['id'],
			where: { CategoryId: reqdata.category.get('id') },
			raw: true
		}).then((subcats) => {
			
			if(subcats) {
				reqdata.subcategories = _.map(subcats, 'id');
				return reqdata;
			} else {
				return Promise.reject(new Error('Missing subcategory for this category. At least one required.'));
			}

		});

	}).then((reqdata) => {

		//-> Get Custom Fields

		return db.PropertyDefinition.findAll({
			where: {
				CategoryId: reqdata.category.get('id'),
				isRestricted: false
			},
			raw: true
		}).then((cfields) => {
		
			reqdata.customfields = (cfields) ? cfields : [];
			return reqdata;

		});

	}).then((reqdata) => {

		//-> Validate form

		req.checkBody('subcategory', lang.t('form.errors.required')).isInt({ min: 1 });
		req.checkBody('subcategory', lang.t('form.errors.enum')).isIn(reqdata.subcategories);

		let subcatId = _.toInteger(req.body.subcategory);

		req.sanitizeBody('title').trim();
		req.sanitizeBody('title').stripLow();
		req.sanitizeBody('title').escape();
		req.checkBody('title', lang.t('form.errors.required')).notEmpty();
		req.checkBody('title', lang.t('form.errors.length', {min: 15, max: 255})).isLength({min: 15, max: 255});

		req.sanitizeBody('description').trim();
		req.sanitizeBody('description').stripLow({ keep_new_lines: true });
		req.sanitizeBody('description').escape();
		req.checkBody('description', lang.t('form.errors.required')).notEmpty();
		req.checkBody('description', lang.t('form.errors.minlength', {min: 15})).isLength({min: 15});

		req.sanitizeBody('deadline').trim();
		req.checkBody('deadline', lang.t('form.errors.invalid')).optional().isDate();
		req.checkBody('deadline', lang.t('form.errors.futuredate')).optional().isAfter();

		//-> Validate custom fields

		if(_.includes(reqdata.subcategories, subcatId)) {
			_.filter(reqdata.customfields, (cf) => {
				return _.isNil(cf.SubCategoryId) || cf.SubCategoryId === subcatId;
			}).forEach((cf) => {

				let cfName = 'cf_' + cf.id;

				//-> Sanitize

				req.sanitizeBody(cfName).trim();
				req.sanitizeBody(cfName).stripLow();
				req.sanitizeBody(cfName).escape();

				//-> Required

				if(cf.isRequired) {
					req.checkBody(cfName, lang.t('form.errors.required')).notEmpty();
				}

				//-> Format Check

				if(cf.format === 'int') {
					(cf.isRequired)
						? req.checkBody(cfName, lang.t('form.errors.invalid')).isInt({min: 0})
						: req.checkBody(cfName, lang.t('form.errors.invalid')).optional().isInt({min: 0});
				}
				if(cf.format === 'choice') {
					let choices = _.split(cf.value, ';');
					(cf.isRequired)
						? req.checkBody(cfName, lang.t('form.errors.invalid')).isIn(choices)
						: req.checkBody(cfName, lang.t('form.errors.invalid')).optional().isIn(choices);
				}

				//-> Custom validator

				if(!_.isEmpty(cf.validation)) {
					(cf.isRequired)
						? req.checkBody(cfName, lang.t('form.errors.invalid')).matches(cf.validation)
						: req.checkBody(cfName, lang.t('form.errors.invalid')).optional().matches(cf.validation);
				}

			});
		}

		//-> Perform validation

		req.asyncValidationErrors().then(() => {

			let nReqDeadline = moment(req.body.deadline, 'YYYY/MM/DD');

			// Create request

			let nReq = {

				title: req.body.title,
				effort: 0,
				progress: 0,
				scrumPoker: 0,
				deadline: null,
				deadlinePre: nReqDeadline.isValid() ? nReqDeadline.toDate() : null,

				CategoryId: reqdata.category.get('id'),
				SubCategoryId: subcatId

			};

			db.Request.create(nReq).then((cReq) => {

				// Set associations

				cReq.setType(reqdata.category.get('defaultType'), { save: false });
				cReq.setStatus(reqdata.category.get('defaultStatus'), { save: false });
				cReq.setPriority(reqdata.category.get('defaultPriority'), { save: false });

				cReq.save();

			});

			res.send({
				state: 'ok',
				errors: []
			});

		}).catch((formErrors) => {

			res.send({
				state: 'error',
				errors: formErrors
			});

		});

	});

});

module.exports = router;
