"use strict";

// ---------------------------------------------
// SETUP TASK - Setup Storage solution
// ---------------------------------------------

var Promise = require('bluebird');

module.exports = (appconfig) => {

	let storage = require('../storage')(appconfig);

	return storage.connect()
		.then(() => {
			return storage.setup()
				.then(() => {
					return Promise.resolve('Storage: Connection established and properly configured.');
				})
				.catch((err) => {
					return Promise.reject(new Promise.OperationalError('Storage: Cannot create base structure. [ ' + err.message + ' ]'));
				});
		})
		.catch((err) => {
			return Promise.reject((err instanceof Promise.OperationalError) ? err : new Error('Storage: Cannot connect to storage provider or invalid configuration.'));
		});

}