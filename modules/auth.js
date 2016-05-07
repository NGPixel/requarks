"use strict";

var _ = require('lodash'),
	moment = require('moment');

module.exports = class UserData {

	/**
	 * Get the base language code
	 *
	 * @method     getLang
	 * @param      {string}  locale  User's locale
	 * @return     {string}  2 letters language code
	 */
	static getLang(locale) {

		return _.head(_.split(locale, '-', 2)) || 'en';

	}

	/**
	 * Get the timezone
	 *
	 * @method     getTimezone
	 * @param      {string}  tz      Raw timezone identifier
	 * @return     {string}  Timezone identifier
	 */	
	static getTimezone(tz) {

		return (tz) || 'America/Montreal';

	}

	/**
	 * Determine if valid user session
	 *
	 * @method     isValidSession
	 * @param      {object}   usrSess  The user session object
	 * @param      {object}   authUsr  The Auth0 User object
	 * @return     {boolean}  True if valid session, False otherwise.
	 */
	static isValidSession(usrSess, authUsr) {

		return (
			_.isPlainObject(usrSess) &&
			usrSess.username === authUsr._json.user_id &&
			usrSess.sessionExpires > moment().utc().unix()
		);

	}

	/**
	 * Get a user by id.
	 *
	 * @method     getById
	 * @param      {int}      usrId   The user id
	 * @return     {Promise}  Promise<db.User instance>
	 */
	static getById(usrId) {

		return db.User.findById(usrId).then((usr) => {

			if(!usr) {
				return Promise.reject(new Error('User not found'));
			}

			return usr;

		});

	}

	/**
	 * Get the user from DB and check authorization
	 *
	 * @method     isAuthorizedUser
	 * @param      {object}   authUsr  Auth0 User object
	 * @return     {Promise}  Promise<db.User instance>
	 */
	static isAuthorizedUser(authUsr) {

		// Attempt via username search

		return db.User.findOne({
			where: {
				username: authUsr._json.user_id,
				isActive: true
			}
		}).then((usr) => {

			// Attempt via new user search

			return (usr) ? usr : db.User.findOne({
				where: {
					username: 'pending:' + authUsr._json.email,
					isActive: true,
					isPending: true
				}
			});

		}).then((usr) => {

			if(!usr) {
				throw new RqError.unauthorized('Unauthorized user');
			}

			return (usr.isPending) ? UserData.resyncUser(authUsr, usr) : usr;

		}).then((usr) => {

			return usr.get();

		}).catch((err) => {
			throw err;
		});

	}

	/**
	 * Resync DB user data with Auth0 user data
	 *
	 * @method     resyncUser
	 * @param      {object}           authUsr  Auth0 User
	 * @param      {object}           usr      User instance
	 * @return     {Promise<object>}  Promise<db.User instance>
	 */
	static resyncUser(authUsr, usr) {

		usr.set('username', authUsr._json.user_id);
		usr.set('firstName', authUsr._json.given_name);
		usr.set('lastName', authUsr._json.family_name);
		usr.set('email', authUsr._json.email);
		usr.set('locale', usr.locale || 'en');
		usr.set('timezone', usr.timezone || 'America/Montreal');
		usr.set('isPending', false);
		return usr.save();

	}

};