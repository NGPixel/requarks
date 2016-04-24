"use strict";

var _ = require('lodash');

module.exports = class UserData {

	static getLang(locale) {

		return _.head(_.split(locale, '-', 2)) || 'en';

	}

};