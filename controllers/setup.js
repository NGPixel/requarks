"use strict";

var express = require('express'),
	 _ = require('lodash'),
	 randomstring = require("randomstring"),
	 Promise = require('bluebird'),
	 autoload = require('auto-load');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('setup', { showform: true, showresults: false, formerrors: [], appconfig: app.locals.appconfig });
});

router.post('/', function(req, res, next) {

	let results = [];

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
		auth0_admin: _.toString(req.body.auth0_admin),
		auth0_id: _.toString(req.body.auth0_id),
		auth0_secret: _.toString(req.body.auth0_secret),
		auth0_apitoken: _.toString(req.body.auth0_apitoken)
	};

	// ---------------------------------------------
	// Do we have form errors?
	// ---------------------------------------------

	let validation = require('../modules/setup/validation')(rawData);

	if(validation.formerrors.length > 0) {

		res.render('setup', {
			showform: true,
			showresults: false,
			formerrors: validation.formerrors,
			installresults: results,
			appconfig: validation.appconfig
		});

		return;

	} else {
		app.locals.appconfig = validation.appconfig;
	}

	// =============================================
	// Setup everything
	// =============================================

	var setupTasks = autoload('modules/setup/tasks');

	//-> Generate Session Secret

	app.locals.appconfig.setup = true;
	app.locals.appconfig.sessionSecret = randomstring.generate(32);

	//-> Run Setup Tasks

	var tasks = [
		setupTasks.taskConfig(app.locals.appconfig),
		setupTasks.taskLocal(app.locals.appconfig),
		setupTasks.taskDb(app.locals.appconfig),
		setupTasks.taskStorage(app.locals.appconfig),
		setupTasks.taskRedis(app.locals.appconfig),
		setupTasks.taskAuth0(app.locals.appconfig)
	];

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
			formerrors: [],
			installresults: results,
			appconfig: app.locals.appconfig
		});

		process.send('reload');
	});

});

module.exports = router;
