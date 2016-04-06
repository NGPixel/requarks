"use strict";

// ---------------------------------------------
// SETUP TASK - Setup Database
// ---------------------------------------------

var Promise = require('bluebird'),
	 path = require('path');

module.exports = (appconfig) => {

	let db = require("../../../models")(appconfig);

	return db.sequelize.authenticate().then(() => {

		// Create database structure
	
		return db.sequelize.sync({force: true}).then(() => {

			// Insert default database data

			let defaultData = require(path.join(__dirname, '../../../models/_setup-data.json'));
			var defaultDataTasks = [];

			Object.keys(defaultData).forEach(function(modelName) {
				defaultDataTasks.push(
					db[modelName].bulkCreate(defaultData[modelName])
				);
			});

			// Insert admin user

			defaultDataTasks.push(db.User.create({
				'username': appconfig.auth0.admin
			}));

			return Promise.all(defaultDataTasks)
			.then(() => {
				return Promise.resolve('Database: Connection established, structure created and default data inserted successfully.');
			})
			.catch((err) => {
		 		return Promise.reject(new Promise.OperationalError('Database: Unable to insert default data.'));
		 	});

	  	})
	 	.catch((err) => {
	 		return Promise.reject((err instanceof Promise.OperationalError) ? err : new Promise.OperationalError('Database: Unable to create table structure.'));
	 	});

	})
	.catch((err) => {
		return Promise.reject((err instanceof Promise.OperationalError) ? err : new Error('Database: Cannot establish connection to database.'));
	});

}