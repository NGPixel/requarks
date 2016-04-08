"use strict";

// ---------------------------------------------
// SETUP TASK - Check for TEMP write access
// ---------------------------------------------

var Promise = require('bluebird'),
	 fs = Promise.promisifyAll(require('fs')),
	 os = require('os');

module.exports = (appconfig) => {

	return fs.accessAsync(os.tmpdir(), fs.R_OK | fs.W_OK)
		.then(() => {
			return Promise.resolve('File System: Verified write access to OS directory for temporary files.');
		})
		.catch((err) => {
			return Promise.reject(new Error('File System: Verify write access to OS directory for temporary files'));
		});

};