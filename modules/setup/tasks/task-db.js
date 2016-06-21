"use strict";

// ---------------------------------------------
// SETUP TASK - Setup Database
// ---------------------------------------------

var Promise = require('bluebird'),
	 _ = require('lodash'),
	 modb = require('mongoose'),
	 fs   = require('fs'),
	 path = require('path');

module.exports = (appconfig) => {

	modb.Promise = require('bluebird');

	// Check connection

	return modb.connect(appconfig.db.connstr).then(() => {

		// Load models

		let dbModels = {};
		let dbModelsPath = path.join(__dirname, '../../../models/db');

		fs
		.readdirSync(dbModelsPath)
		.filter(function(file) {
			return (file.indexOf(".") !== 0);
		})
		.forEach(function(file) {
			let modelName = _.upperFirst(_.split(file,'.')[0]);
			dbModels[modelName] = require(path.join(dbModelsPath, file));
		});

		// Insert default database data

		let defaultData = require(path.join(__dirname, '../_setup-data.json'));
		var defaultDataTasks = [];

		Object.keys(defaultData).forEach(function(modelName) {
			defaultDataTasks.push(
				dbModels[modelName].collection.insert(defaultData[modelName])
			);
		});

		// Insert admin user

		defaultDataTasks.push(dbModels.User.findOneAndUpdate({
			username: appconfig.auth0.admin
		}, {
			_id: modb.Types.ObjectId(),
			username: appconfig.auth0.admin,
			isActive: true,
			isPending: true
		}, {
			upsert: true,
			setDefaultsOnInsert: true
		}));

		return Promise.all(defaultDataTasks)
		.then(() => {
			return Promise.resolve('Database: Connection established, structure created and default data inserted successfully.');
			modb.disconnect();
		})
		.catch((err) => {
	 		return Promise.reject(new Promise.OperationalError('Database: Unable to insert default data.'));
	 	});

	})
	.catch((err) => {
		return Promise.reject((err instanceof Promise.OperationalError) ? err : new Error('Database: Cannot establish connection to database.'));
	});

};