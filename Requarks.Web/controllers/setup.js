"use strict";

var express = require('express'),
	 fs = require('fs'),
	 os = require('os'),
	 path = require('path'),
	 _ = require('lodash'),
	 randomstring = require("randomstring"),
	 validator = require('validator'),
	 Promise = require('bluebird');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('setup', { showform: true, showresults: false, formerrors: [], appconfig: app.locals.appconfig });
});

router.post('/', function(req, res, next) {

	let results = [];
	let formerrors = [];

	// =============================================
	// Validate data
	// =============================================

	let rawData = {
		site_title: _.toString(req.body.site_title),
		site_host: _.toString(req.body.site_host),
		db_engine: _.toString(req.body.db_engine),
		db_path: _.toString(req.body.db_path),
		db_host: _.toString(req.body.db_host),
		db_name: _.toString(req.body.db_name),
		db_user: _.toString(req.body.db_user),
		db_pass: _.toString(req.body.db_pass),
		storage_provider: _.toString(req.body.storage_provider),
		storage_path: _.toString(req.body.storage_path),
		storage_az_name: _.toString(req.body.storage_az_name),
		storage_az_key: _.toString(req.body.storage_az_key),
		storage_s3_name: _.toString(req.body.storage_s3_name),
		storage_s3_region: _.toString(req.body.storage_s3_region),
		storage_s3_id: _.toString(req.body.storage_s3_id),
		storage_s3_key: _.toString(req.body.storage_s3_key),
		redis_config: _.toString(req.body.redis_config),
		redis_host: _.toString(req.body.redis_host),
		redis_path: _.toString(req.body.redis_path),
		redis_pass: _.toString(req.body.redis_pass),
		redis_port: _.toString(req.body.redis_port),
		auth0_domain: _.toString(req.body.auth0_domain),
		auth0_id: _.toString(req.body.auth0_id),
		auth0_secret: _.toString(req.body.auth0_secret)
	};


	//-> Title

	if(validator.isLength(rawData.site_title, {min:2, max: 255})) {
		app.locals.appconfig.title = rawData.site_title;
	} else {
		formerrors.push({ field: 'site_title', msg: 'Title of invalid length.' });
	}

	//-> Host

	if(validator.isURL(rawData.site_host, {require_protocol:true})) {
		app.locals.appconfig.host = rawData.site_host;
	} else {
		formerrors.push({ field: 'site_host', msg: 'Invalid site host.' });
	}

	//-> Database Engine

	if(validator.isIn(rawData.db_engine, _.keys(app.locals.appdata.dbengines))) {
		app.locals.appconfig.db.engine = rawData.db_engine;
	} else {
		formerrors.push({ field: 'db_engine', msg: 'Invalid database engine.' });
	}

	if(rawData.db_engine == 'sqlite') {

		//-> Database Path

		if(path.isAbsolute(req.body.db_path)) {
			app.locals.appconfig.db.host = rawData.db_path;
		} else {
			formerrors.push({ field: 'db_path', msg: 'Database Path is invalid.' });
		}

	} else {

		//-> Database Host

		if(validator.matches(rawData.db_host, /^[a-zA-Z0-9\-\.]{3,}(:[0-9]{1,5})?$/)) {
			let dbhost = _.split(rawData.db_host, ':', 2);
			app.locals.appconfig.db.host = dbhost[0];
			app.locals.appconfig.db.port = dbhost.length > 1 ? dbhost[1] : null;
		} else {
			formerrors.push({ field: 'db_host', msg: 'Database Host is invalid.' });
		}

		//-> Database Name

		if(validator.matches(rawData.db_name, /^[a-zA-Z0-9\-_]{2,128}$/)) {
			app.locals.appconfig.db.name = rawData.db_name;
		} else {
			formerrors.push({ field: 'db_name', msg: 'Database Name is invalid.' });
		}

		//-> Database Username

		if(validator.matches(rawData.db_user, /^[a-zA-Z0-9\-_@]{2,128}$/)) {
			app.locals.appconfig.db.user = rawData.db_user;
		} else {
			formerrors.push({ field: 'db_user', msg: 'Database Username is invalid.' });
		}

		//-> Database Password

		if(validator.isLength(rawData.db_pass, {min:8, max: 128})) {
			app.locals.appconfig.db.pass = rawData.db_pass;
		} else {
			formerrors.push({ field: 'db_pass', msg: 'Database Password is invalid or too short.' });
		}

	}

	//-> Storage Solution

	if(validator.isIn(rawData.storage_provider, _.keys(app.locals.appdata.storageproviders))) {
		app.locals.appconfig.storage.provider = rawData.storage_provider;
	} else {
		formerrors.push({ field: 'storage_provider', msg: 'Invalid storage provider.' });
	}

	switch(rawData.storage_provider) {
		case 'local':

			if(path.isAbsolute(rawData.storage_path)) {
				app.locals.appconfig.storage.path = rawData.storage_path;
			} else {
				formerrors.push({ field: 'storage_path', msg: 'Invalid storage folder path.' });
			}

		break;
		case 'azure':

			if(validator.isLength(rawData.storage_az_name, {min:3, max: 24}) && validator.isAlphanumeric(rawData.storage_az_name) && validator.isLowercase(rawData.storage_az_name)) {
				app.locals.appconfig.storage.name = rawData.storage_az_name;
			} else {
				formerrors.push({ field: 'storage_az_name', msg: 'Invalid Storage Azure Account Name.' });
			}

			if(validator.isLength(rawData.storage_az_key, {min:10}) && validator.isBase64(rawData.storage_az_key)) {
				app.locals.appconfig.storage.key = rawData.storage_az_key;
			} else {
				formerrors.push({ field: 'storage_az_key', msg: 'Invalid Storage Azure Access Key.' });
			}

		break;
		case 's3':

			if(validator.isLength(rawData.storage_s3_name, {min:3, max: 63}) && validator.isLowercase(rawData.storage_s3_name)) {
				app.locals.appconfig.storage.name = rawData.storage_s3_name;
			} else {
				formerrors.push({ field: 'storage_s3_name', msg: 'Invalid Storage S3 Bucket Name.' });
			}

			if(validator.isLength(rawData.storage_s3_region, {min:3, max: 32}) && validator.isLowercase(rawData.storage_s3_region)) {
				app.locals.appconfig.storage.region = rawData.storage_s3_region;
			} else {
				formerrors.push({ field: 'storage_s3_region', msg: 'Invalid Storage S3 Region.' });
			}

			if(validator.isLength(rawData.storage_s3_id, {min:16, max: 32}) && validator.isAlphanumeric(rawData.storage_s3_id)) {
				app.locals.appconfig.storage.id = rawData.storage_s3_id;
			} else {
				formerrors.push({ field: 'storage_s3_id', msg: 'Invalid Storage S3 Access Key ID.' });
			}

			if(validator.isLength(rawData.storage_s3_key, {min:8})) {
				app.locals.appconfig.storage.key = rawData.storage_s3_key;
			} else {
				formerrors.push({ field: 'storage_s3_key', msg: 'Invalid Storage S3 Secret Access Key.' });
			}

		break;
	}

	//-> Redis Configuration

	if(validator.isIn(rawData.redis_config, _.keys(app.locals.appdata.redisconfigs))) {
		app.locals.appconfig.redis.config = rawData.redis_config;
	} else {
		formerrors.push({ field: 'redis_config', msg: 'Invalid Redis configuration.' });
	}

	if(rawData.redis_config == 'socket') {

			if(path.isAbsolute(rawData.redis_path)) {
				app.locals.appconfig.redis.path = rawData.redis_path;
			} else {
				formerrors.push({ field: 'redis_path', msg: 'Invalid Redis socket path.' });
			}

	} else {

		if(validator.matches(rawData.redis_host, /^[a-zA-Z0-9\-\.]{3,}$/)) {
			app.locals.appconfig.redis.host = rawData.redis_host;
		} else {
			formerrors.push({ field: 'redis_host', msg: 'Invalid Redis host.' });
		}

		if(validator.matches(rawData.redis_port, /^[0-9]{2,5}$/)) {
			app.locals.appconfig.redis.port = rawData.redis_port;
		} else {
			formerrors.push({ field: 'redis_port', msg: 'Invalid Redis port.' });
		}

		if(rawData.redis_config != 'noauth') {

			if(validator.isLength(rawData.redis_pass, {min:8})) {
				app.locals.appconfig.redis.pass = rawData.redis_pass;
			} else {
				formerrors.push({ field: 'redis_pass', msg: 'Invalid Redis password / access key or too short.' });
			}

		}

	}

	//-> Auth0

	if(validator.isFQDN(rawData.auth0_domain)) {
		app.locals.appconfig.auth0.domain = rawData.auth0_domain;
	} else {
		formerrors.push({ field: 'auth0_domain', msg: 'Invalid Auth0 domain.' });
	}

	if(validator.isLength(rawData.auth0_id, {min:10})) {
		app.locals.appconfig.auth0.clientID = rawData.auth0_id;
	} else {
		formerrors.push({ field: 'auth0_id', msg: 'Invalid Auth0 Client ID.' });
	}

	if(validator.isLength(rawData.auth0_secret, {min:10})) {
		app.locals.appconfig.auth0.clientSecret = rawData.auth0_secret;
	} else {
		formerrors.push({ field: 'auth0_secret', msg: 'Invalid Auth0 Client Secret.' });
	}

	// ---------------------------------------------
	// Do we have form errors?
	// ---------------------------------------------

	if(formerrors.length > 0) {

		res.render('setup', {
			showform: true,
			showresults: false,
			formerrors: formerrors,
			installresults: results,
			appconfig: app.locals.appconfig
		});

		return;

	}

	// =============================================
	// Setup everything
	// =============================================

	var tasks = [];

	// ---------------------------------------------
	// Check for config.json write access
	// ---------------------------------------------

	tasks.push(new Promise(function (resolve, reject) {
		fs.access('./config.json', fs.R_OK | fs.W_OK, (err) => {
			results.push({
				title: 'Can write to config.json?... ' + ((err) ? 'Failed' : ' OK'),
				success: !(err)
			});

			if(!err) {

				app.locals.appconfig.setup = true;
				app.locals.appconfig.sessionSecret = randomstring.generate(32);

				let configJSON = JSON.stringify(app.locals.appconfig, null, 3);
				fs.writeFile('./config.json', configJSON, (err) => {
					results.push({
						title: 'Write configuration to disk...' + ((err) ? 'Failed' : ' OK'),
						success: !(err)
					});
					resolve();
				});

			} else {
				resolve();
			}

		});
	}));

	// ---------------------------------------------
	// Check for TEMP write access
	// ---------------------------------------------

	tasks.push(new Promise(function (resolve, reject) {
		fs.access(os.tmpdir(), fs.R_OK | fs.W_OK, (err) => {
			results.push({
				title: 'Can write to OS directory for temporary files?... ' + ((err) ? 'Failed' : ' OK'),
				success: !(err)
			});
			resolve();
		});
	}));

	// ---------------------------------------------
	// Setup Database
	// ---------------------------------------------

	var db = require("../models")(app.locals.appconfig);

	tasks.push(new Promise(function (resolve, reject) {

		// Try to authenticate

		return db.sequelize.authenticate().then(function() {

			results.push({
				title: 'Can connect to database engine?... OK',
				success: true
			});

			// Create database structure
		
			return db.sequelize.sync({force: true}).then(function () {

				results.push({
					title: '-- Create database structure... OK',
					success: true
				});

				// Enter default data

				return db.User.create({
					username:   'admin',
					firstName:  'Administrator',
					lastName:   'Admin',
					email:      'admin@requarks.io',
					jobTitle:   'Site Administrator'
				}).then(function(row) {

					results.push({
						title: '-- Insert default data... OK',
						success: true
					});
					resolve();

				})
				.catch(function(err) {
			 		results.push({
						title: '-- Insert default data... Failed',
						success: false
					});
					resolve();
			 	});

		  	})
		 	.catch(function(err) {
		 		results.push({
					title: '-- Create database structure... Failed',
					success: false
				});
				resolve();
		 	});

		})
		.catch(function(err) {
			results.push({
				title: 'Can connect to database engine?... Failed',
				success: false
			});
			resolve();
		});

	}));

	// ---------------------------------------------
	// Setup Storage solution
	// ---------------------------------------------

	/*results.push({
		title: 'Can access storage solution?',
		success: tmpState
	});

	results.push({
		title: '-- Create base structure in storage...',
		success: tmpState
	});

	// ---------------------------------------------
	// Setup Redis
	// ---------------------------------------------

	results.push({
		title: 'Can connect to Redis instance?',
		success: tmpState
	});

	// ---------------------------------------------
	// Setup Auth0
	// ---------------------------------------------

	results.push({
		title: 'Auth0 is accessible and properly configured?',
		success: tmpState
	});

	results.push({
		title: '-- Create administrator account...',
		success: tmpState
	});*/

	// ---------------------------------------------
	// Return results
	// ---------------------------------------------

	Promise.all(tasks).then(function() {
		res.render('setup', {
			showform: (_.filter(results, ['success', false]).length > 0),
			showresults: true,
			formerrors: formerrors,
			installresults: results,
			appconfig: app.locals.appconfig
		});
	});

});

module.exports = router;
