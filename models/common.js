"use strict";

var _ = require('lodash');

/**
 * Common database queries
 */
module.exports = class Common {

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
			where: { _id: options.slug }
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