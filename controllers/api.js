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