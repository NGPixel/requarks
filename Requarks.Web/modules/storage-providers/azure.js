"use strict";

var _ = require('lodash'),
	fs = require('fs'),
	path = require('path'),
	azure = require('azure-storage'),
	Promise = require('bluebird'),
	StorageProvider = require('./base');

class StorageProviderAzure extends StorageProvider {

	constructor(appconfig) {
		super(appconfig);
	}

	connect() {
		return new Promise(function (resolve, reject) {
			//blobService = azure.createBlobService(this.conf.name, this.conf.key);
			return resolve('TEST');
		});
	}

	saveTemp(file, data) {
		console.log('TEST1');
	}

	readTemp(file) {
		console.log('TEST2');
	}

}

module.exports = StorageProviderAzure;