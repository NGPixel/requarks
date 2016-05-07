"use strict";

/**
 * Dropdown
 */
class Dropdown {

	/**
	 * Constructor
	 *
	 * @param      {jQuery Element}  dObj    jQuery Element to bind to
	 */
	constructor(dObj) {

		let self = this;

		this.obj = dObj;
		this.state = false;

		this.obj.children('div').on('click', (e) => {
			self.toggle();
		});

	}

	/**
	 * Toggle dropdown menu
	 */
	toggle() {

		if(this.state) {
			this.open();
		} else {
			this.close();
		}

	}

	/**
	 * Show the dropdown menu
	 */
	open() {

		this.obj.addClass('shown');
		this.obj.children('ul').finish().slideDown(200);
		this.state = true;

	}

	/**
	 * Hide the dropdown menu
	 */
	close() {

		this.obj.removeClass('shown');
		this.obj.children('ul').finish().slideUp(200);
		this.state = false;

	}

}