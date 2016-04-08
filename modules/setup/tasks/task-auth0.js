"use strict";

// ---------------------------------------------
// SETUP TASK - Setup Auth0
// ---------------------------------------------

var Promise = require('bluebird'),
	 ManagementClient = require('auth0').ManagementClient,
	 fs = Promise.promisifyAll(require('fs'));

module.exports = (appconfig) => {

	//-> Create management client

	let auth0 = new ManagementClient({
		domain: appconfig.auth0.domain,
		token: appconfig.auth0.apiToken
	});

	//-> Attempt to connect

	return auth0.connections.getAll()
		.then(() => {

			//-> Get user

			return auth0.users.get({ id: appconfig.auth0.admin })
				.then((usr) => {

					//-> Promote user to admin

					return auth0.users.updateAppMetadata({ id: appconfig.auth0.admin }, { admin: true })
						.then(() => {
							return Promise.resolve('Auth0: Connection established and promoted administrator user.');
						}).catch((err) => {
							return Promise.reject(new Promise.OperationalError('Auth0: Unable to update administrator metadata for administrator role.'));
						});

				}).catch((err) => {
					return Promise.reject(new Promise.OperationalError('Auth0: Unable to fetch user designed for administrator role.'));
				});
			
		})
		.catch((err) => {
			return Promise.reject((err instanceof Promise.OperationalError) ? err : new Error('Auth0: Unable to connect / authenticate to Auth0.'));
		});

};