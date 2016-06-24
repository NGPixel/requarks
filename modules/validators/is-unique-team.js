"use strict";

var Promise = require('bluebird'),
	 slug = require('slug');

module.exports = (teamName) => {

	return new Promise(function (resolve, reject) {

		teamName = slug(teamName, {lower: true});

		return db.Team.count({
			slug: teamName
		}).then((teamCount) => {
			if(teamCount > 0) {
				reject(new Error('Team name is not unique.'));
			} else {
				resolve();
			}
		}).catch((err) => {
			reject(new Error('Error when validating team name.'));
		});

	});

};