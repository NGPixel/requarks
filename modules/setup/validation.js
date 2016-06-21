"use strict";

var validator = require('validator'),
	 _ = require('lodash'),
	 path = require('path');

module.exports = (rawData) => {

	let appconfig = {
	  db: {},
	  storage: {
	    "local": {},
	    "azure": {},
	    "google": {},
	    "s3": {},
	    "softlayer": {}
	  },
	  redis: {},
	  auth0: {}
	};
	let formerrors = [];

	//-> Title

	if(validator.isLength(rawData.site_title, {min:2, max: 255})) {
		appconfig.title = rawData.site_title;
	} else {
		formerrors.push({ field: 'site_title', msg: 'Title of invalid length.' });
	}

	//-> Host

	if(validator.isURL(rawData.site_host, {require_protocol:true}) && !_.endsWith(rawData.site_host, '/')) {
		appconfig.host = rawData.site_host;
	} else {
		formerrors.push({ field: 'site_host', msg: 'Invalid site host. ( Do not use trailing slash! )' });
	}

	// ---------------------------------------------
	// Validate: Database
	// ---------------------------------------------

	if(validator.matches(rawData.db_connstr, /^mongodb:\/\/([a-zA-Z0-9_-]+:.+@)?[a-zA-Z0-9.-]+[:0-9]*\/[a-zA-Z0-9_-]+$/)) {
		appconfig.db.connstr = rawData.db_connstr;
	} else {
		formerrors.push({ field: 'db_connstr', msg: 'Database connection string is invalid.' });
	}

	// ---------------------------------------------
	// Validate: Storage
	// ---------------------------------------------

	if(validator.isIn(rawData.storage_provider, _.keys(app.locals.appdata.storageproviders))) {
		appconfig.storage.provider = rawData.storage_provider;
	} else {
		formerrors.push({ field: 'storage_provider', msg: 'Invalid storage provider.' });
	}

	switch(rawData.storage_provider) {
		case 'local':

			//-> Local Storage Path

			if(path.isAbsolute(rawData.storage_path)) {
				appconfig.storage.local.path = rawData.storage_path;
			} else {
				formerrors.push({ field: 'storage_path', msg: 'Invalid storage folder path.' });
			}

		break;
		case 'azure':

			//-> Azure Storage Account Name

			if(validator.matches(rawData.storage_az_name, /^[a-z0-9]{3,24}$/)) {
				appconfig.storage.azure.name = rawData.storage_az_name;
			} else {
				formerrors.push({ field: 'storage_az_name', msg: 'Invalid Storage Azure Account Name.' });
			}

			//-> Azure Storage Access Key

			if(validator.isLength(rawData.storage_az_key, {min:10}) && validator.isBase64(rawData.storage_az_key)) {
				appconfig.storage.azure.key = rawData.storage_az_key;
			} else {
				formerrors.push({ field: 'storage_az_key', msg: 'Invalid Storage Azure Access Key.' });
			}

		break;
		case 's3':

			//-> Amazon S3 Bucket Name

			if(validator.matches(rawData.storage_s3_bucket, /^[a-z0-9]{3,40}$/)) {
				appconfig.storage.s3.bucket = rawData.storage_s3_bucket;
			} else {
				formerrors.push({ field: 'storage_s3_bucket', msg: 'Invalid Storage S3 Bucket Prefix Name.' });
			}

			//-> Amazon S3 Region

			if(validator.isLength(rawData.storage_s3_region, {min:3, max: 32}) && validator.isLowercase(rawData.storage_s3_region)) {
				appconfig.storage.s3.region = rawData.storage_s3_region;
			} else {
				formerrors.push({ field: 'storage_s3_region', msg: 'Invalid Storage S3 Region.' });
			}

			//-> Amazon S3 Access Key ID

			if(validator.isLength(rawData.storage_s3_id, {min:16, max: 32}) && validator.isAlphanumeric(rawData.storage_s3_id)) {
				appconfig.storage.s3.id = rawData.storage_s3_id;
			} else {
				formerrors.push({ field: 'storage_s3_id', msg: 'Invalid Storage S3 Access Key ID.' });
			}

			//-> Amazon S3 Secret Access Key

			if(validator.isLength(rawData.storage_s3_key, {min:8})) {
				appconfig.storage.s3.key = rawData.storage_s3_key;
			} else {
				formerrors.push({ field: 'storage_s3_key', msg: 'Invalid Storage S3 Secret Access Key.' });
			}

		break;
		case 'google':

			//-> Google Bucket Name

			if(validator.matches(rawData.storage_gl_bucket, /^[a-z0-9]{3,40}$/)) {
				appconfig.storage.google.bucket = rawData.storage_gl_bucket;
			} else {
				formerrors.push({ field: 'storage_gl_bucket', msg: 'Invalid Storage Google Bucket Prefix Name.' });
			}

			//-> Google Keyfile Path

			if(path.isAbsolute(rawData.storage_gl_keyfile) && _.endsWith(rawData.storage_gl_keyfile, '.json')) {
				appconfig.storage.google.keyfile = rawData.storage_gl_keyfile;
			} else {
				formerrors.push({ field: 'storage_gl_keyfile', msg: 'Invalid storage Google keyfile path.' });
			}

		break;
	}

	// ---------------------------------------------
	// Validate: Redis
	// ---------------------------------------------

	if(validator.isIn(rawData.redis_config, _.keys(app.locals.appdata.redisconfigs))) {
		appconfig.redis.config = rawData.redis_config;
	} else {
		formerrors.push({ field: 'redis_config', msg: 'Invalid Redis configuration.' });
	}

	if(rawData.redis_config === 'socket') {

		//-> Redis Unix Socket

		if(path.isAbsolute(rawData.redis_path)) {
			appconfig.redis.path = rawData.redis_path;
		} else {
			formerrors.push({ field: 'redis_path', msg: 'Invalid Redis socket path.' });
		}

	} else {

		//-> Redis Host

		if(validator.matches(rawData.redis_host, /^[a-zA-Z0-9\-\.]{3,}$/)) {
			appconfig.redis.host = rawData.redis_host;
		} else {
			formerrors.push({ field: 'redis_host', msg: 'Invalid Redis host.' });
		}

		//-> Redis Port

		if(validator.matches(rawData.redis_port, /^[0-9]{2,5}$/)) {
			appconfig.redis.port = rawData.redis_port;
		} else {
			formerrors.push({ field: 'redis_port', msg: 'Invalid Redis port.' });
		}

		if(rawData.redis_config !== 'noauth') {

			//-> Redis Authentication Pass / Key

			if(validator.isLength(rawData.redis_pass, {min:8})) {
				appconfig.redis.pass = rawData.redis_pass;
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
		appconfig.auth0.domain = rawData.auth0_domain;
	} else {
		formerrors.push({ field: 'auth0_domain', msg: 'Invalid Auth0 domain.' });
	}

	//-> Auth0 Admin User ID

	if(validator.isLength(rawData.auth0_admin, {min:5})) {
		appconfig.auth0.admin = rawData.auth0_admin;
	} else {
		formerrors.push({ field: 'auth0_admin', msg: 'Invalid Auth0 Administrator User ID.' });
	}

	//-> Auth0 Client ID

	if(validator.isLength(rawData.auth0_id, {min:10})) {
		appconfig.auth0.clientID = rawData.auth0_id;
	} else {
		formerrors.push({ field: 'auth0_id', msg: 'Invalid Auth0 Client ID.' });
	}

	//-> Auth0 Client Secret

	if(validator.isLength(rawData.auth0_secret, {min:10})) {
		appconfig.auth0.clientSecret = rawData.auth0_secret;
	} else {
		formerrors.push({ field: 'auth0_secret', msg: 'Invalid Auth0 Client Secret.' });
	}

	//-> Auth0 API Token

	if(validator.isLength(rawData.auth0_apitoken, {min:50})) {
		appconfig.auth0.apiToken = rawData.auth0_apitoken;
	} else {
		formerrors.push({ field: 'auth0_apitoken', msg: 'Invalid Auth0 API Token.' });
	}

	return {
		appconfig,
		formerrors
	};

};