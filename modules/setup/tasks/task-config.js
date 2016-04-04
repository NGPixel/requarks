"use strict";

// ---------------------------------------------
// SETUP TASK - Check for config.json write access
// ---------------------------------------------

var Promise = require('bluebird'),
	 fs = Promise.promisifyAll(require('fs'));

module.exports = (appconfig) => {

	return fs.accessAsync('./config.json', fs.R_OK | fs.W_OK).then(() => {

		//-> Write configuration to disk

		let configJSON = JSON.stringify(appconfig, null, 3);
		return fs.writeFileAsync('./config.json', configJSON)
		.then(() => {
			return Promise.resolve('File System: Configuration written to disk succesfully.');
		})
		.catch((err) => {
			return Promise.reject(new Promise.OperationalError('File System: Cannot write configuration to disk! Make sure config.json is writable.'));
		});

	})
	.catch((err) => {
		return Promise.reject((err instanceof Promise.OperationalError) ? err : new Error('File System: Cannot write to config.json! Make sure folder is writable.'));
	});

}