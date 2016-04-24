var express = require('express');
var router = express.Router();
var moment = require('moment');

// ----------------------------------------------------
// SETTINGS - Profile
// ----------------------------------------------------

router.get('/', function(req, res, next) {
	res.render('settings/profile', {
		navbar_active: 'settings',
		page_script: 'settings',
		settingsnav_active: 'profile'
	});
});

// ----------------------------------------------------
// SETTINGS - Avatar
// ----------------------------------------------------

router.get('/avatar', function(req, res, next) {
	res.render('settings/avatar', {
		navbar_active: 'settings',
		page_script: 'settings',
		settingsnav_active: 'avatar'
	});
});

// ----------------------------------------------------
// SETTINGS - Preferences
// ----------------------------------------------------

router.get('/preferences', function(req, res, next) {
	res.render('settings/prefs', {
		navbar_active: 'settings',
		page_script: 'settings',
		settingsnav_active: 'preferences',
		timezones: moment.tz.names()
	});
});

module.exports = router;
