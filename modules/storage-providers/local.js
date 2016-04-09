"use strict";

var path = require('path'),
	Promise = require('bluebird'),
	fs = Promise.promisifyAll(require('fs')),
	StorageProvider = require('./base');

class StorageProviderLocal extends StorageProvider {

	/**
	 * Constructor
	 * @param  {object} appconfig Application Configuration
	 * @return {void}
	 */
	constructor(appconfig) {
		super(appconfig);
	}

	/**
	 * Access local directory on file system
	 * @return {Promise} Promise
	 */
	connect() {
		return fs.accessAsync(this.conf.local.path, fs.R_OK | fs.W_OK).then(() => {
			return Promise.resolve(true);
		})
		.catch((err) => {
			return Promise.reject(new Error('Storage::connect - Directory access failed'));
		});
	}

	/**
	 * Create container on file system
	 * @param  {string} conName Name of the container
	 * @return {Promise}         Promise
	 */
	createContainer(conName) {
		let fpath = path.join(this.conf.local.path, conName);
		return fs.accessAsync(fpath, fs.F_OK).then(() => {
			return Promise.resolve(true);
		}).catch(() => {
			return fs.mkdirAsync(fpath).then(() => {
				return Promise.resolve(true);
			}).catch((err) => {
				return Promise.reject(new Error('Storage::createContainer - Cannot verify container'));
			});
		});
	}

}

module.exports = StorageProviderLocal;