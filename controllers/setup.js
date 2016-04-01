"use strict";

var express = require('express'),
	 os = require('os'),
	 path = require('path'),
	 _ = require('lodash'),
	 randomstring = require("randomstring"),
	 validator = require('validator'),
	 Promise = require('bluebird'),
	 fs = Promise.promisifyAll(require('fs')),
	 jwt = require('jsonwebtoken'),
	 rest = require('restling'),
	 util = require('util');

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
		storage_s3_bucket: _.toString(req.body.storage_s3_bucket),
		storage_s3_region: _.toString(req.body.storage_s3_region),
		storage_s3_id: _.toString(req.body.storage_s3_id),
		storage_s3_key: _.toString(req.body.storage_s3_key),
		storage_gl_bucket: _.toString(req.body.storage_gl_bucket),
		storage_gl_keyfile: _.toString(req.body.storage_gl_keyfile),
		redis_config: _.toString(req.body.redis_config),
		redis_host: _.toString(req.body.redis_host),
		redis_path: _.toString(req.body.redis_path),
		redis_pass: _.toString(req.body.redis_pass),
		redis_port: _.toString(req.body.redis_port),
		auth0_domain: _.toString(req.body.auth0_domain),
		auth0_id: _.toString(req.body.auth0_id),
		auth0_secret: _.toString(req.body.auth0_secret),
		auth0_apikey: _.toString(req.body.auth0_apikey),
		auth0_apisecret: _.toString(req.body.auth0_apisecret)
	};


	//-> Title

	if(validator.isLength(rawData.site_title, {min:2, max: 255})) {
		app.locals.appconfig.title = rawData.site_title;
	} else {
		formerrors.push({ field: 'site_title', msg: 'Title of invalid length.' });
	}

	//-> Host

	if(validator.isURL(rawData.site_host, {require_protocol:true}) && !_.endsWith(rawData.site_host, '/')) {
		app.locals.appconfig.host = rawData.site_host;
	} else {
		formerrors.push({ field: 'site_host', msg: 'Invalid site host. ( Do not use trailing slash! )' });
	}

	// ---------------------------------------------
	// Validate: Database
	// ---------------------------------------------

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

	// ---------------------------------------------
	// Validate: Storage
	// ---------------------------------------------

	if(validator.isIn(rawData.storage_provider, _.keys(app.locals.appdata.storageproviders))) {
		app.locals.appconfig.storage.provider = rawData.storage_provider;
	} else {
		formerrors.push({ field: 'storage_provider', msg: 'Invalid storage provider.' });
	}

	switch(rawData.storage_provider) {
		case 'local':

			//-> Local Storage Path

			if(path.isAbsolute(rawData.storage_path)) {
				app.locals.appconfig.storage.local.path = rawData.storage_path;
			} else {
				formerrors.push({ field: 'storage_path', msg: 'Invalid storage folder path.' });
			}

		break;
		case 'azure':

			//-> Azure Storage Account Name

			if(validator.matches(rawData.storage_az_name, /^[a-z0-9]{3,24}$/)) {
				app.locals.appconfig.storage.azure.name = rawData.storage_az_name;
			} else {
				formerrors.push({ field: 'storage_az_name', msg: 'Invalid Storage Azure Account Name.' });
			}

			//-> Azure Storage Access Key

			if(validator.isLength(rawData.storage_az_key, {min:10}) && validator.isBase64(rawData.storage_az_key)) {
				app.locals.appconfig.storage.azure.key = rawData.storage_az_key;
			} else {
				formerrors.push({ field: 'storage_az_key', msg: 'Invalid Storage Azure Access Key.' });
			}

		break;
		case 's3':

			//-> Amazon S3 Bucket Name

			if(validator.matches(rawData.storage_s3_bucket, /^[a-z0-9]{3,40}$/)) {
				app.locals.appconfig.storage.s3.bucket = rawData.storage_s3_bucket;
			} else {
				formerrors.push({ field: 'storage_s3_bucket', msg: 'Invalid Storage S3 Bucket Prefix Name.' });
			}

			//-> Amazon S3 Region

			if(validator.isLength(rawData.storage_s3_region, {min:3, max: 32}) && validator.isLowercase(rawData.storage_s3_region)) {
				app.locals.appconfig.storage.s3.region = rawData.storage_s3_region;
			} else {
				formerrors.push({ field: 'storage_s3_region', msg: 'Invalid Storage S3 Region.' });
			}

			//-> Amazon S3 Access Key ID

			if(validator.isLength(rawData.storage_s3_id, {min:16, max: 32}) && validator.isAlphanumeric(rawData.storage_s3_id)) {
				app.locals.appconfig.storage.s3.id = rawData.storage_s3_id;
			} else {
				formerrors.push({ field: 'storage_s3_id', msg: 'Invalid Storage S3 Access Key ID.' });
			}

			//-> Amazon S3 Secret Access Key

			if(validator.isLength(rawData.storage_s3_key, {min:8})) {
				app.locals.appconfig.storage.s3.key = rawData.storage_s3_key;
			} else {
				formerrors.push({ field: 'storage_s3_key', msg: 'Invalid Storage S3 Secret Access Key.' });
			}

		break;
		case 'google':

			//-> Google Bucket Name

			if(validator.matches(rawData.storage_gl_bucket, /^[a-z0-9]{3,40}$/)) {
				app.locals.appconfig.storage.google.bucket = rawData.storage_gl_bucket;
			} else {
				formerrors.push({ field: 'storage_gl_bucket', msg: 'Invalid Storage Google Bucket Prefix Name.' });
			}

			//-> Google Keyfile Path

			if(path.isAbsolute(rawData.storage_gl_keyfile) && _.endsWith(rawData.storage_gl_keyfile, '.json')) {
				app.locals.appconfig.storage.google.keyfile = rawData.storage_gl_keyfile;
			} else {
				formerrors.push({ field: 'storage_gl_keyfile', msg: 'Invalid storage Google keyfile path.' });
			}

		break;
	}

	// ---------------------------------------------
	// Validate: Redis
	// ---------------------------------------------

	if(validator.isIn(rawData.redis_config, _.keys(app.locals.appdata.redisconfigs))) {
		app.locals.appconfig.redis.config = rawData.redis_config;
	} else {
		formerrors.push({ field: 'redis_config', msg: 'Invalid Redis configuration.' });
	}

	if(rawData.redis_config === 'socket') {

		//-> Redis Unix Socket

		if(path.isAbsolute(rawData.redis_path)) {
			app.locals.appconfig.redis.path = rawData.redis_path;
		} else {
			formerrors.push({ field: 'redis_path', msg: 'Invalid Redis socket path.' });
		}

	} else {

		//-> Redis Host

		if(validator.matches(rawData.redis_host, /^[a-zA-Z0-9\-\.]{3,}$/)) {
			app.locals.appconfig.redis.host = rawData.redis_host;
		} else {
			formerrors.push({ field: 'redis_host', msg: 'Invalid Redis host.' });
		}

		//-> Redis Port

		if(validator.matches(rawData.redis_port, /^[0-9]{2,5}$/)) {
			app.locals.appconfig.redis.port = rawData.redis_port;
		} else {
			formerrors.push({ field: 'redis_port', msg: 'Invalid Redis port.' });
		}

		if(rawData.redis_config !== 'noauth') {

			//-> Redis Authentication Pass / Key

			if(validator.isLength(rawData.redis_pass, {min:8})) {
				app.locals.appconfig.redis.pass = rawData.redis_pass;
			} else {
				formerrors.push({ field: 'redis_pass', msg: 'Invalid Redis password / access key or too short.' });
			}

		}

	}

	// ---------------------------------------------
	// Validate: Auth0
	// ---------------------------------------------

	//-> Auth0 Domain

	if(validator.isFQDN(rawData.auth0_domain)) {
		app.locals.appconfig.auth0.domain = rawData.auth0_domain;
	} else {
		formerrors.push({ field: 'auth0_domain', msg: 'Invalid Auth0 domain.' });
	}

	//-> Auth0 Client ID

	if(validator.isLength(rawData.auth0_id, {min:10})) {
		app.locals.appconfig.auth0.clientID = rawData.auth0_id;
	} else {
		formerrors.push({ field: 'auth0_id', msg: 'Invalid Auth0 Client ID.' });
	}

	//-> Auth0 Client Secret

	if(validator.isLength(rawData.auth0_secret, {min:10})) {
		app.locals.appconfig.auth0.clientSecret = rawData.auth0_secret;
	} else {
		formerrors.push({ field: 'auth0_secret', msg: 'Invalid Auth0 Client Secret.' });
	}

	//-> Auth0 Client Secret

	if(validator.isLength(rawData.auth0_apikey, {min:10})) {
		app.locals.appconfig.auth0.apiKey = rawData.auth0_apikey;
	} else {
		formerrors.push({ field: 'auth0_apikey', msg: 'Invalid Auth0 API Key.' });
	}

	//-> Auth0 Client Secret

	if(validator.isLength(rawData.auth0_apisecret, {min:10})) {
		app.locals.appconfig.auth0.apiSecret = rawData.auth0_apisecret;
	} else {
		formerrors.push({ field: 'auth0_apisecret', msg: 'Invalid Auth0 API Secret.' });
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

	tasks.push(
		fs.accessAsync('./config.json', fs.R_OK | fs.W_OK).then(() => {

			//-> Generate Session Secret

			app.locals.appconfig.setup = true;
			app.locals.appconfig.sessionSecret = randomstring.generate(32);

			//-> Write configuration to disk

			let configJSON = JSON.stringify(app.locals.appconfig, null, 3);
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
		})
	);

	// ---------------------------------------------
	// Check for TEMP write access
	// ---------------------------------------------

	tasks.push(
		fs.accessAsync(os.tmpdir(), fs.R_OK | fs.W_OK)
		.then(() => {
			return Promise.resolve('File System: Verified write access to OS directory for temporary files.');
		})
		.catch((err) => {
			return Promise.reject(new Error('File System: Verify write access to OS directory for temporary files'));
		})
	);

	// ---------------------------------------------
	// Setup Database
	// ---------------------------------------------

	var db = require("../models")(app.locals.appconfig);

	tasks.push(

		// Try to authenticate

		db.sequelize.authenticate().then(() => {

			// Create database structure
		
			return db.sequelize.sync({force: true}).then(() => {

				// Insert default database data

				let defaultData = require(path.join(__dirname, '../models/_setup-data.json'));
				var defaultDataTasks = [];

				Object.keys(defaultData).forEach(function(modelName) {
					defaultDataTasks.push(
						db[modelName].bulkCreate(defaultData[modelName])
					);
				});

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
		})

	);

	// ---------------------------------------------
	// Setup Storage solution
	// ---------------------------------------------

	var storage = require('../modules/storage')(app.locals.appconfig);
	tasks.push(
		storage.connect()
		.then(() => {
			return storage.setup()
				.then(() => {
					return Promise.resolve('Storage: Connection established and properly configured.');
				})
				.catch((err) => {
					return Promise.reject(new Promise.OperationalError('Storage: Cannot create base structure. [ ' + err.message + ' ]'));
				});
		})
		.catch((err) => {
			return Promise.reject((err instanceof Promise.OperationalError) ? err : new Error('Storage: Cannot connect to storage provider or invalid configuration.'));
		})
	);

	// ---------------------------------------------
	// Setup Redis
	// ---------------------------------------------

	var red = require('../modules/redis')(app.locals.appconfig);

	tasks.push(
		new Promise(function (resolve, reject) {
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
		})
	);

	// ---------------------------------------------
	// Setup Auth0
	// ---------------------------------------------

	var token = jwt.sign({
		"scopes": {
			"connections": {
				"actions": [
					"read",
        			"create"
				]
			}
		}
	},
	new Buffer(app.locals.appconfig.auth0.apiSecret, 'base64'),
	{
		audience: app.locals.appconfig.auth0.apiKey
	});

	tasks.push(
		rest.get('https://' + app.locals.appconfig.auth0.domain + '/api/v2/connections', {
			accessToken: token
		})
		.then(() => {
			return Promise.resolve('Auth0: Verified connection and base configuration.');
		})
		.catch(function(err) {
			return Promise.reject(new Error('Auth0: Unable to connect / authenticate to Auth0.'));
		})
	);

	// ---------------------------------------------
	// Return results
	// ---------------------------------------------

	Promise.all(
		tasks.map(function(promise) {
			return promise.reflect();
		})
	)
	.each(function(inspection) {
		if (inspection.isFulfilled()) {
			results.push({
				title: inspection.value(),
				success: true
			});
		} else {
			results.push({
				title: inspection.reason().cause || inspection.reason(),
				success: false
			});
		}
	})
	.then(() => {
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
