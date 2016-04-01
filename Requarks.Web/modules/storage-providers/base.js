"use strict";

var Promise = require('bluebird');

class StorageProvider {

	/**
	 * Constructor
	 * @param  {object} appconfig Application Configuration
	 * @return {void}
	 */
	constructor(appconfig) {
		this.conf = appconfig.storage;
		this.containers = {
			files: 'requarks-files',
			avatars: 'requarks-avatars',
			archive: 'requarks-archive'
		}
	}

	/**
	 * Establish connection to Storage Provider
	 * @return {Promise} Promise
	 */
	connect() {
		return Promise.reject(new Error('Storage::connect - Not Implemented'));
	}

	/**
	 * First-time setup of the Storage Provider
	 * @return {Promise} Promise
	 */
	setup() {
		let self = this;
		return Promise.each([
			() => { return self.createContainer(self.containers.files) },
			() => { return self.createContainer(self.containers.avatars) },
			() => { return self.createContainer(self.containers.archive) }
		], function (promiseFn) {
			return promiseFn();
		});
	}

	/**
	 * Save a temporary file to disk
	 * @param  {string} file Filename
	 * @param  {string} data Contents of the file
	 * @return {Promise}     Promise
	 */
	saveTemp(file, data) {
		return Promise.reject(new Error('Storage::saveTemp - Not Implemented'));
	}

	/**
	 * Read a temporary file from disk
	 * @param  {string} file Filename
	 * @return {Promise<string>}     Promise
	 */
	readTemp(file) {
		return Promise.reject(new Error('Storage::readTeamp - Not Implemented'));
	}

}

module.exports = StorageProvider;