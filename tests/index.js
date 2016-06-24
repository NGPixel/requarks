"use strict";

let path = require('path'),
	 fs = require('fs');

// ========================================
// Load global modules
// ========================================

global._ = require('lodash');
global.winston = require('winston');

// ========================================
// Load configuration values
// ========================================

fs.access('../config.json', fs.R_OK, (err) => {
	if(err) {

		// Use default test values

		global.appconfig = {
		   "db": {
		      "connstr": "mongodb://localhost/requarks"
		   },
		   "storage": {
		      "local": {
		         "path": path.join(process.env.HOME, './requarksdata/')
		      },
		      "provider": "local"
		   },
		   "redis": {
		      "config": "noauth",
		      "host": "localhost",
		      "port": "6379"
		   },
		   "auth0": {},
		   "title": "Requarks",
		   "host": "http://localhost",
		   "setup": true,
		   "sessionSecret": "1234567890abcdefghijklmnopqrstuvxyz"
		}
		
		fs.mkdirSync(appconfig.storage.local.path);

	} else {

		// Use current values

		global.appconfig = require('../config.json');

	}

	// ========================================
	// Run Tests
	// ========================================

	require('./setup-db.js');

});