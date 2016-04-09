"use strict";

var _ = require('lodash');

module.exports = (appconfig) => {

	// Validate storage provider
	
	let validProviders = require('../data.json').storageproviders;
	if(!_.includes(_.keys(validProviders), appconfig.storage.provider)) {
		return null;
	}

	// Load storage provider

	let Storage = require('./storage-providers/' + appconfig.storage.provider);

	return new Storage(appconfig);

};