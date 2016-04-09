"use strict";

var azure = require('azure-storage'),
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
		this.blobService = null;
	}

	/**
	 * Establish connection to Azure
	 * @return {Promise} Promise
	 */
	connect() {
		let self = this;
		return new Promise(function (resolve, reject) {
			self.blobService = azure.createBlobService(self.conf.azure.name, self.conf.azure.key);
			self.blobService.doesContainerExist('requarks', {}, (err, result, resp) => {
				if(err) {
					reject(new Error('Storage::connect - Connection failed'));
				} else {
					resolve(result);
				}
			});
		});
	}

	/**
	 * Create container on file system
	 * @param  {string} conName Name of the container
	 * @return {Promise}         Promise
	 */
	createContainer(conName) {
		let self = this;
		return new Promise(function (resolve, reject) {
			if(self.blobService === null) {
				return reject(new Error('Storage connector is not available. Connection failed.'));
			}
			self.blobService.createContainerIfNotExists(conName, {
				publicAccessLevel : azure.BlobUtilities.BlobContainerPublicAccessType.OFF
			}, (err, result, resp) => {
				if(err) {
					reject(new Error('Storage::connect - Connection failed'));
				} else {
					resolve(result);
				}
			});
		});
	}

}

module.exports = StorageProviderAzure;