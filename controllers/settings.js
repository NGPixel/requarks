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

router.post('/', function(req, res, next) {

	//-> Validate form

	req.sanitizeBody('settings_profile_fname').trim();
	req.checkBody('settings_profile_fname', lang.t('form.errors.required')).notEmpty();
	req.checkBody('settings_profile_fname', lang.t('form.errors.length', {min: 3, max: 50})).isLength({min: 3, max: 50});

	req.sanitizeBody('settings_profile_lname').trim();
	req.checkBody('settings_profile_lname', lang.t('form.errors.required')).notEmpty();
	req.checkBody('settings_profile_lname', lang.t('form.errors.length', {min: 3, max: 50})).isLength({min: 3, max: 50});

	req.sanitizeBody('settings_profile_email').trim();
	req.sanitizeBody('settings_profile_email').normalizeEmail();
	req.checkBody('settings_profile_email', lang.t('form.errors.required')).notEmpty();
	req.checkBody('settings_profile_email', lang.t('form.errors.email')).isEmail();
	req.checkBody('settings_profile_email', lang.t('form.errors.length', {min: 6, max: 255})).isLength({min: 6, max: 255});

	req.sanitizeBody('settings_profile_jobtitle').trim();
	req.checkBody('settings_profile_jobtitle', lang.t('form.errors.length', {min: 0, max: 255})).optional().isLength({min: 0, max: 255});

	//-> Get current user

	req.asyncValidationErrors().then(() => {

		return db.User.findById(res.locals.usr.id).then((usr) => {
			
			if(usr) {

				//-> Save changes

				usr.set('firstName', req.body.settings_profile_fname);
				usr.set('lastName', req.body.settings_profile_lname);
				usr.set('email', req.body.settings_profile_email);
				usr.set('jobTitle', req.body.settings_profile_jobtitle);

				return usr.save().then(() => {
					req.session.usr = usr;

					req.flash('alert', {
						class: 'success',
						title: 'Saved',
						message:  "Profile saved successfully.",
						iconClass: 'fa-check'
					});

					return res.redirect('/settings');
				}).catch((err) => {
					throw err;
				});

			} else {
				throw new Error('Invalid current user.');
			}

		}).catch((err) => {
			throw err;
		});

	}).catch((formErrors) => {

		res.render('settings/profile', {
			navbar_active: 'settings',
			page_script: 'settings',
			settingsnav_active: 'profile',
			formErrors
		});

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

					req.flash('alert', {
						class: 'success',
						title: 'Saved',
						message:  "Preferences saved successfully",
						iconClass: 'fa-check'
					});

					return res.redirect('/settings/preferences');
				}).catch((err) => {
					throw err;
				});

			} else {
				throw new Error('Invalid current user.');
			}

		}).catch((err) => {
			throw err;
		});

	}).catch((formErrors) => {

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
