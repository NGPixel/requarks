"use strict";

// ---------------------------------------------
// SETUP TASK - Setup Redis
// ---------------------------------------------

var Promise = require('bluebird');

module.exports = (appconfig) => {

	let red = require('../redis')(appconfig);

	return new Promise(function (resolve, reject) {
		red.on('connect', function () {
			red.disconnect();
			resolve('Redis: Connection successful to Redis instance.');
		});
		red.on('error', function() {
			red.disconnect();
			reject(new Promise.OperationalError('Redis: Cannot establish connection to Redis instance.'));
		});
	}).timeout(5000).catch((err) => {
		red.disconnect();
		return Promise.reject((err instanceof Promise.OperationalError) ? err : new Error('Redis: Cannot establish connection to Redis instance. (Timeout)'));
	});

}