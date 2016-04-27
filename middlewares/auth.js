"use strict";

var Promise = require('bluebird'),
	moment = require('moment');

module.exports = function(req, res, next) {

	// Is user authenticated ?

	if (req.baseUrl !== '/login' && !req.isAuthenticated()) {
		return res.redirect('/login');
	}

	// Do we have a session user ?

	let usrFetch = {};
	if(UserData.isValidSession(req.session.usr, req.user)) {
		usrFetch = Promise.resolve(req.session.usr);
	} else {
		usrFetch = UserData.isAuthorizedUser(req.user);
	}

	// Is user authorized ?

	usrFetch.then((usr) => {

		// Set session user
		
		if(!usr.sessionExpires) {
			usr.sessionExpires = moment().utc().add(5, 'm').unix();
		}
		req.session.usr = usr;

		// Set i18n locale

		req.i18n.changeLanguage(UserData.getLang(usr.locale));

		// Expose user data

		res.locals.usr = usr;
		res.locals.authusr = req.user._json;

		return next();

	}).catch((err) => {
		return res.redirect('/unauthorized');
	});

};