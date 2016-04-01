"use strict";

var _ = require('lodash'),
	path = require('path'),
	gcloud = require('gcloud'),
	Promise = require('bluebird'),
	fs = Promise.promisifyAll(require('fs')),
	StorageProvider = require('./base');

class StorageProviderGoogle extends StorageProvider {

	/**
	 * Constructor
	 * @param  {object} appconfig Application Configuration
	 * @return {void}
	 */
	constructor(appconfig) {
		super(appconfig);
		this.gcs = null;
	}

	/**
	 * Establish connection to Google Cloud Storage
	 * @return {Promise} Promise
	 */
	connect() {
		let self = this;
		return new Promise(function (resolve, reject) {
			return fs.accessAsync(self.conf.google.keyfile, fs.R_OK).then(() => {
				return fs.readFileAsync(self.conf.google.keyfile, 'utf8').then((keydata) => {
					try {
						let keydataObj = JSON.parse(keydata);
						if(_.isString(keydataObj.project_id)) {
							self.gcs = gcloud.storage({
								projectId: keydataObj.project_id,
								keyFilename: self.conf.google.keyfile
							});
						} else {
							throw new Error('Storage::connect - Invalid Key File');
						}
					} catch(err) {
						return reject(err);
					}
					return resolve(true);
				});
			});
		});
	}

	/**
	 * Create container (bucket) on Google Cloud Storage
	 * @param  {string} conName Name of the container
	 * @return {Promise}         Promise
	 */
	createContainer(conName) {
		let self = this;
		return new Promise(function (resolve, reject) {
			if(self.gcs === null) {
				return reject(new Error('Storage::createContainer - Storage connector is not available. Connection failed.'));
			}
			self.gcs.createBucket(_.replace(conName, '{prefix}', self.conf.google.bucket), function(err, bucket) {
				if(err && err.errors[0].reason === 'conflict' && err.message.indexOf('own') >= 0 ) {
					return resolve(true);
				} else {
					return (!err) ? resolve(bucket) : reject(err);
				}
			});
		});
	}

}

module.exports = StorageProviderGoogle;