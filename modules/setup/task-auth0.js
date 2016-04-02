"use strict";

// ---------------------------------------------
// SETUP TASK - Setup Auth0
// ---------------------------------------------

var Promise = require('bluebird'),
	 jwt = require('jsonwebtoken'),
	 rest = require('restling');

module.exports = (appconfig) => {

	let token = jwt.sign({
		"scopes": {
			"connections": {
				"actions": [
					"read",
        			"create"
				]
			}
		}
	},
	new Buffer(appconfig.auth0.apiSecret, 'base64'),
	{
		audience: appconfig.auth0.apiKey
	});

	return rest.get('https://' + appconfig.auth0.domain + '/api/v2/connections', {
		accessToken: token
	})
	.then(() => {
		return Promise.resolve('Auth0: Verified connection and base configuration.');
	})
	.catch(function(err) {
		return Promise.reject(new Error('Auth0: Unable to connect / authenticate to Auth0.'));
	});

}