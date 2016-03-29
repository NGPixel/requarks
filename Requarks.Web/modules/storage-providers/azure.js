"use strict";

var _ = require('lodash'),
	fs = require('fs'),
	path = require('path'),
	azure = require('azure-storage'),
	Promise = require('bluebird'),
	StorageProvider = require('./base');

class StorageProviderAzure extends StorageProvider {

	/**
	 * Constructor
	 * @param  {object} appconfig Application Configuration
	 * @return {void}
	 */
	constructor(appconfig) {
		super(appconfig);
	}

	/**
	 * Establish connection to Azure
	 * @return {Promise} Promise of the connection result
	 */
	connect() {
		let self = this;
		return new Promise(function (resolve, reject) {
			let blobService = azure.createBlobService(self.conf.name, self.conf.key);
			blobService.doesContainerExist('requarks', {}, (err, result, resp) => {
				if(err != undefined) {
					reject(new Error('Storage::connect - Connection failed'));
				} else {
					resolve(result);
				}
			});
		});
	}

}

module.exports = StorageProviderAzure;