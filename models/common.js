"use strict";

var _ = require('lodash'),
	Promise = require('bluebird');

/**
 * Common database queries
 */
module.exports = class Common {


	/**
	 * Convert ObjectIDs to String in document
	 *
	 * @param      {Document}  doc     The original document
	 * @param      {Document}  ret     The transformed document
	 * @param      {Object}    opt     Options
	 * @return     {Document}  Transformed document
	 */
	static stringifyIds(doc, ret, opt) {
		if(doc.id && typeof doc.id !== String) {
			ret.id = _.toString(doc.id.valueOf());
		}
		return ret;
	}

	/**
	 * Fetches a latest increments and stores them in Redis cache
	 */
	static fetchLatestIncrements(bypassSave) {

		// Requests

		return db.Request.findOne({}).sort({ _id: -1}).exec().then((rq) => {
			return (bypassSave) ? Promise.resolve('OK') : red.set('db:request_next_id', (rq && _.isFinite(rq._id)) ? rq._id + 1 : 1);
		});

	}

	/**
	 * Gets the current identifier and increment it.
	 *
	 * @param      {string}  col     Collection name
	 * @return     {Number}  Incremented identifier
	 */
	static getIdAndIncrement(col) {

		return red.incr('db:' + col + '_next_id');

	}

	/**
	 * Gets category and its subcategories (optional).
	 *
	 * @param      {string}   catSlug  Category Slug
	 * @param      {boolean}  subCats  Should subcategories be included in results
	 * @return     {object}   Category and its subcategories (optional)
	 */
	static getCategory(options) {

		options = _.defaults(options, {
			slug: null,
			includeSubCats: true
		});

		return db.Category.findOne({
			_id: options.slug
		}, 'slug name description color icon').then((cat) => {

			if(cat) {
				return { category: cat };
			} else {
				return Promise.reject(new Error('Invalid category'));
			}

		}).then((reqdata) => {

			if(!options.includeSubCats) {
				return reqdata.category;
			}

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

		});

	}


};