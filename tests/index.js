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

try {

	// can't use async here, doing it the ugly way...

	let configPath = path.join(__dirname, '../config.json');

	fs.accessSync(configPath, fs.R_OK);
	global.appconfig = require(configPath);

} catch(err) {

	// Use default test values

	let dataPath = (process.env.HOME) ? path.join(process.env.HOME, './requarksdata/') : path.join(__dirname, './tempdata/');

	global.appconfig = {
	   "db": {
	      "connstr": "mongodb://localhost/requarks"
	   },
	   "storage": {
	      "local": {
	         "path": dataPath
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
	};
	
	fs.mkdirSync(dataPath);

}

// ========================================
// Run Tests
// ========================================

require('./db.js');