"use strict";

/**
 * Dropdown
 */
class Dropdown {

	/**
	 * Constructor
	 *
	 * @class
	 *
	 * @param      {Element}  dObj    Element to bind to
	 */
	constructor(dObj) {

		let self = this;

		self.obj = $(dObj);
		self.state = false;

		self.obj.children('div').on('click', (e) => { self.toggle(e); });
		$('ul > li', self.obj).on('click', (e) => { self.pick(e); });

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

		self.obj.children('input').val($(e.currentTarget).data('value'));
		$('div > span', self.obj).html($(e.currentTarget).data('label'));

		self.obj.children('input').change();

		self.close();

	}

}