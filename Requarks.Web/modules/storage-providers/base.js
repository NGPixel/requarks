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
	}

	/**
	 * Establish connection to Storage Provider
	 * @return {Promise} Promise of the connection result
	 */
	connect() {
		return Promise.reject(new Error('Storage::connect - Not Implemented'));
	}

	/**
	 * First-time setup of the Storage Provider
	 * @return {Promise} Promise of the setup result
	 */
	setup() {
		return new Promise(function (resolve, reject) {
			return resolve('TEST');
		});
	}

	/**
	 * Save a temporary file to disk
	 * @param  {string} file Filename
	 * @param  {string} data Contents of the file
	 * @return {Promise}     Promise of the save operation
	 */
	saveTemp(file, data) {
		return Promise.reject(new Error('Storage::saveTemp - Not Implemented'));
	}

	/**
	 * Read a temporary file from disk
	 * @param  {string} file Filename
	 * @return {Promise<string>}     Promise containing the file contents
	 */
	readTemp(file) {
		return Promise.reject(new Error('Storage::readTeamp - Not Implemented'));
	}

}

module.exports = StorageProvider;