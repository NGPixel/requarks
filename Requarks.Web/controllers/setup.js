"use strict";

var express = require('express'),
	 fs = require('fs'),
	 os = require('os'),
	 _ = require('lodash'),
	 randomstring = require("randomstring");

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('setup', { showform: true, showresults: false, appconfig: app.locals.appconfig });
});

router.post('/', function(req, res, next) {

	let results = [];
	let tmpState = false;

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
