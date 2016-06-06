"use strict";

var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();

/*
 * ITEM - Redirect to Review
 */
router.get('/', (req, res, next) => {

	res.redirect(301, '/review');

});

/*
 * ITEM - View Request
 */
router.get('/:id', (req, res, next) => {

	res.render('item/item', {
		navbar_active: 'item',
		page_script: 'item'
	});

});

module.exports = router;