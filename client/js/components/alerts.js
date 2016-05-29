"use strict";

/**
 * Alerts
 */
class Alerts {

	/**
	 * Constructor
	 *
	 * @class
	 */
	constructor() {

		let self = this;

		self.mdl = new Vue({
			el: '#alerts',
			data: {
				children: []
			}
		});

		self.uidNext = 1;

	}

	/**
	 * Show a new Alert
	 *
	 * @param      {String}   aType   Alert Type
	 * @param      {String}   aTitle  Alert Title
	 * @param      {String}   aMsg    Alert Main Message
	 * @param      {Boolean}  sticky  Should the alert stay displayed until user
	 *                                action
	 */
	push(aType, aTitle, aMsg, aIcon, sticky) {

		let self = this;

		let nAlert = {
			_uid: self.uidNext,
			class: aType,
			title: aTitle,
			iconClass: aIcon,
			message: aMsg
		};

		self.mdl.children.push(nAlert);

		if(!sticky) {
			_.delay(() => {
				let nAlertIdx = _.indexOf(self.mdl.children, nAlert);
				nAlert.class = aType + ' exit';
				self.mdl.children.$set(nAlertIdx, nAlert);
				_.delay(() => {
					self.mdl.children.$remove(nAlert);
				}, 500);
			}, 5000);
		}

		self.uidNext++;

	}

}