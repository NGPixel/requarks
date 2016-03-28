"use strict";

var Promise = require('bluebird');

class StorageProvider {

	constructor(appconfig) {
		this.conf = appconfig.storage;
	}

	connect() {
		return Promise.reject(new Error('Storage::connect - Not Implemented'));
	}

	setup() {
		return new Promise(function (resolve, reject) {
			return resolve('TEST');
		});
	}

	saveTemp(file, data) {
		return Promise.reject(new Error('Storage::saveTemp - Not Implemented'));
	}

	readTemp(file) {
		return Promise.reject(new Error('Storage::readTeamp - Not Implemented'));
	}

}

module.exports = StorageProvider;