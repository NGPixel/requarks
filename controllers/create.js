"use strict";

var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();

/*
 * CREATE - Select category
 */
router.get('/', (req, res, next) => {

	db.Category.find()
	.sort('name')
	.select('name description color icon')
	.exec()
	.then((cats) => {
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
		_id: req.params.id
	}).then((cat) => {

		if(cat) {
			return cat.toObject({ transform: db.common.stringifyIds });
		} else {
			return Promise.reject(new Error('Invalid category'));
		}

	}).then((reqdata) => {

		// Sort subcategories
			
		if(reqdata.subCategories && reqdata.subCategories.length > 0) {
			reqdata.subCategories = _.sortBy(reqdata.subCategories, 'sortIndex');
			return reqdata;
		} else {
			return Promise.reject(new Error('Missing subcategory for this category. At least one required.'));
		}

	}).then((reqdata) => {

		// Sort Custom Fields

		reqdata.fields = (reqdata.fields) ? _.sortBy(_.filter(reqdata.fields, {
			isRestricted: false
		}), 'sortIndex') : [];
		return reqdata;

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
		_id: req.params.id
	}).then((cat) => {

		if(cat) {
			return cat.toObject({ transform: db.common.stringifyIds });
		} else {
			return Promise.reject(new Error('Invalid category'));
		}

	}).then((reqdata) => {

		// Check subcategories
			
		if(reqdata.subCategories && reqdata.subCategories.length > 0) {
			return reqdata;
		} else {
			return Promise.reject(new Error('Missing subcategory for this category. At least one required.'));
		}

	}).then((reqdata) => {

		//-> Check Custom Fields

		reqdata.fields = (reqdata.fields) ? _.filter(reqdata.fields, {
			isRestricted: false
		}) : [];
		return reqdata;

	}).then((reqdata) => {

		let validSubCategories = _.map(reqdata.subCategories,'id');

		//-> Validate form

		req.sanitizeBody('subcategory').trim();
		req.checkBody('subcategory', lang.t('form.errors.required')).notEmpty();
		req.checkBody('subcategory', lang.t('form.errors.enum')).isIn(validSubCategories);

		let subcatId = _.trim(req.body.subcategory);

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

		let cfields = [];

		if(_.includes(validSubCategories, subcatId)) {

			//-> Filter custom fields for selected subcategory only

			cfields = _.filter(reqdata.fields, (cf) => {
				return _.isNil(cf.subCategory) || cf.subCategory === subcatId;
			});

			//-> Validate against filtered custom fields

			cfields.forEach((cf) => {

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

			return db.common.getIdAndIncrement('request').then((nextIdx) => {

				let nReqDeadline = moment(req.body.deadline, 'YYYY/MM/DD');

				//-> Create request

				let nReq = {

					_id: nextIdx,

					summary: req.body.title,
					planning: {
						effort: 0,
						progress: 0,
						scrumPoker: 0,
						deadline: null,
						deadlineInitial: nReqDeadline.isValid() ? nReqDeadline.toDate() : null,
					},
					priority: reqdata.defaultPriority,
					activities: [
						{
							summary: "Initial Request Creation",
							author: res.locals.usr._id
						}
					],
					comments: [],
					descriptions: [
						{
							content: req.body.description,
							author: res.locals.usr._id
						}
					],
					documents: [],
					fields: [],
					notes: [],
					category: reqdata._id,
					subCategory: db.ObjectId(subcatId),
					status: reqdata.defaultStatus,
					requestType: reqdata.defaultType,
					parent: 0,
					author: res.locals.usr._id,
					assignees: [],
					sprints: [],
					stakeholders: [],
					dependencies: []

				};

				//-> Create custom fields

				cfields.forEach((cf) => {

					let cfName = 'cf_' + cf.id;

					if(_.has(req.body, cfName)) {
						nReq.fields.push({
							value: req.body[cfName],
							definition: db.ObjectId(cf.id)
						});
					}

				});

				//-> Save request data

				return db.Request.create(nReq).then((cReq) => {

					return res.send({
						state: 'ok',
						id: cReq.id
					});

				});

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
