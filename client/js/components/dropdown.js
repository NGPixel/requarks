"use strict";

/**
 * Dropdown
 * @class
 */
class Dropdown {

	/**
	 * Constructor
	 *
	 * @constructor
	 * @param      {Element}  dObj    Element to bind to
	 */
	constructor(dObj) {

		let self = this;

		this.obj = $(dObj);
		this.state = false;

		this.obj.children('div').on('click', (e) => { self.toggle(e); });
		$('ul > li', this.obj).on('click', (e) => { self.pick(e); });

	}

	/**
	 * Toggle dropdown menu
	 *
	 * @param      {Event}  e       Click Event
	 */
	toggle(e) {

		if(!this.state) {
			this.open();
		} else {
			this.close();
		}

	}

	/**
	 * Show the dropdown menu
	 */
	open() {

		let self = this;

		this.obj.addClass('shown');
		this.obj.children('ul').finish().slideDown(200);
		this.state = true;

		this.obj.one('mouseleave', (e) => {
			self.close();
		});

	}

	/**
	 * Hide the dropdown menu
	 */
	close() {

		this.obj.removeClass('shown');
		this.obj.children('ul').finish().slideUp(200);
		this.state = false;

	}

	/**
	 * Pick value from menu
	 *
	 * @param      {Event}  e       Click Event
	 */
	pick(e) {

		let self = this;

		this.obj.children('input').val($(e.currentTarget).data('value'));
		$('div > span', this.obj).html($(e.currentTarget).data('label'));

		self.close();

	}

}