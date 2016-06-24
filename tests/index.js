"use strict";

let path = require('path'),
	 fs = require('fs');

// ========================================
// Load global modules
// ========================================

global._ = require('lodash');
global.winston = require('winston');
global.appconfig = require('../config.json', _.noop, (err) => {

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
	   "testenv": true,
	   "sessionSecret": "1234567890abcdefghijklmnopqrstuvxyz"
	}

});

// ========================================
// Test CI specifics
// ========================================

if(appconfig.testenv) {
	fs.mkdirSync(appconfig.storage.local.path);
}

// ========================================
// Run Tests
// ========================================

require('./setup-db.js');