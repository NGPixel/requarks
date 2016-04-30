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
	 * @param      {object}  usrSess  The user session object
	 * @param      {object}  authUsr  The Auth0 User object
	 */
	static isValidSession(usrSess, authUsr) {

		return (
			_.isPlainObject(usrSess) &&
			usrSess.username === authUsr._json.user_id &&
			usrSess.sessionExpires > moment().utc().unix()
		);

	}

	/**
	 * Get the user from DB and check authorization
	 *
	 * @method     isAuthorizedUser
	 * @param      {object}   authUsr  Auth0 User object
	 * @return     {Promise}  Promise<db.User instance>
	 */
	static isAuthorizedUser(authUsr) {

		return db.User.findOne({
			where: {
				$or: [
					{
						email: authUsr._json.email
					},
					{
						username: authUsr._json.user_id
					}
				]
			}
		}).then((usr) => {
			
			return (!usr.isActive) ? UserData.resyncUser(authUsr, usr) : usr;

		}).then((usr) => {

			return usr.get();

		}).catch((err) => {
			console.log(err);
			return err;
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

		usr.username = authUsr._json.user_id;
		usr.firstName = authUsr._json.given_name;
		usr.lastName = authUsr._json.family_name;
		usr.email = authUsr._json.email;
		usr.isActive = true;
		return usr.save();

	}

};