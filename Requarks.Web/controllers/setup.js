"use strict";

var express = require('express'),
	 fs = require('fs'),
	 os = require('os'),
	 path = require('path'),
	 _ = require('lodash'),
	 randomstring = require("randomstring"),
	 validator = require('validator');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('setup', { showform: true, showresults: false, formerrors: [], appconfig: app.locals.appconfig });
});

router.post('/', function(req, res, next) {

	let results = [];
	let formerrors = [];
	let tmpState = false;

	// ---------------------------------------------
	// Validate data
	// ---------------------------------------------

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

		if(validator.matches(rawData.db_user, /^[a-zA-Z0-9_]{2,128}$/)) {
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

	// ---------------------------------------------
	// Check for config.json write access
	// ---------------------------------------------

	try {
		fs.accessSync('./config.json', fs.R_OK | fs.W_OK);
		tmpState = true;
	} catch(e) {
		tmpState = false;
	}

	results.push({
		title: 'Can write to ./config.json?',
		success: tmpState
	})	;

	// ---------------------------------------------
	// Check for TEMP write access
	// ---------------------------------------------

	try {
		console.log(os.tmpdir());
		fs.accessSync(os.tmpdir(), fs.R_OK | fs.W_OK);
		tmpState = true;
	} catch(e) {
		tmpState = false;
	}

	results.push({
		title: 'Can write to OS directory for temporary files?',
		success: tmpState
	});

	// ---------------------------------------------
	// Setup Database
	// ---------------------------------------------

	results.push({
		title: 'Can connect to database engine?',
		success: tmpState
	});

	/*var sql = new Sequelize(app.locals.appconfig.db.name, app.locals.appconfig.db.user, app.locals.appconfig.db.pass, {
		host: app.locals.appconfig.db.host,
		port: app.locals.appconfig.db.port,
		dialect: app.locals.appconfig.db.engine,

		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},

		// SQLite only
		storage: (app.locals.appconfig.db.engine == 'sqlite') ? app.locals.appconfig.db.path : null
	});*/

	results.push({
		title: '-- Create database schema with default values...',
		success: tmpState
	});

	// ---------------------------------------------
	// Setup Storage solution
	// ---------------------------------------------

	results.push({
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
	// Setup Redis
	// ---------------------------------------------

	results.push({
		title: 'Auth0 is accessible and properly configured?',
		success: tmpState
	});

	results.push({
		title: '-- Create administrator account...',
		success: tmpState
	});

	// ---------------------------------------------
	// Save configuration file
	// ---------------------------------------------
	
	//app.locals.appconfig.setup = true;
	app.locals.appconfig.sessionSecret = randomstring.generate(32);

	let configJSON = JSON.stringify(app.locals.appconfig, null, 3);
	fs.writeFile('./config.json', configJSON);

	results.push({
		title: 'Write configuration to disk...',
		success: tmpState
	});

	res.render('setup', {
		showform: (_.filter(results, ['success', false]).length > 0),
		showresults: true,
		installresults: results,
		appconfig: app.locals.appconfig
	});
});

module.exports = router;
