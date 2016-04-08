"use strict";

var _ = require('lodash'),
	fs = require('fs'),
	path = require('path'),
	util = require('util');

module.exports = (appconfig) => {

	// Load storage provider

	let Storage = {};
	switch(appconfig.storage.provider) {
		case 'local':
			Storage = require('./storage-providers/local');
		break;
		case 'azure':
			Storage = require('./storage-providers/azure');
		break;
		case 's3':
			Storage = require('./storage-providers/s3');
		break;
		case 'google':
			Storage = require('./storage-providers/google');
		break;
		case 'softlayer':
			Storage = require('./storage-providers/softlayer');
		break;
		default:
			return null;
	}

	return new Storage(appconfig);

};