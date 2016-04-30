var express = require('express');
var router = express.Router();

var moment = require('moment'),
	_ = require('lodash');

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

router.post('/preferences', function(req, res, next) {

	//-> Validate form

	req.checkBody('settings_prefs_locale', lang.t('form.errors.required')).notEmpty();
	req.checkBody('settings_prefs_locale', lang.t('form.errors.enum')).isIn(_.keys(app.locals.appdata.locales));

	req.checkBody('settings_prefs_timezone', lang.t('form.errors.required')).notEmpty();
	req.checkBody('settings_prefs_timezone', lang.t('form.errors.enum')).isIn(moment.tz.names());

	//-> Get current user

	req.asyncValidationErrors().then(() => {
		
		return db.User.findById(res.locals.usr.id).then((usr) => {
			
			if(usr) {

				//-> Save changes

				usr.set('locale', req.body.settings_prefs_locale);
				usr.set('timezone', req.body.settings_prefs_timezone);

				return usr.save().then(() => {
					req.session.usr = usr;
					return res.redirect('/settings/preferences');
				}).catch((err) => {
					throw err;
				});

			} else {
				throw new Error('Invalid current user.');
			}

			return true;

		}).catch((err) => {
			throw err;
		});

	}).catch(function(formErrors) {

		res.render('settings/prefs', {
			navbar_active: 'settings',
			page_script: 'settings',
			settingsnav_active: 'preferences',
			timezones: moment.tz.names(),
			formErrors
		});

	});

	
});

module.exports = router;
