"use strict";

/**
 * FileBox
 */
class FileBox {

	/**
	 * Constructor
	 *
	 * @class
	 *
	 * @param      {Element/String}  id      Element or selector to bind to
	 */
	constructor(id) {

		let self = this;

		self.el = $(id);
		self.input = $('input[type=file]', self.el).first();

		self.obj = new Vue({
			el: id,
			data: {
				items: []
			}
		});

		$('.filebox-placeholder', self.el).on('click', (e) => { self.selectFiles(e); });
		self.input.on('change', (e) => { self.handleFiles(e); })

	}

	/**
	 * Select file(s)
	 *
	 * @param      {Event}  e       Click Event
	 */
	selectFiles(e) {

		this.input.click();
		e.preventDefault();

	}

	/**
	 * Select file(s)
	 *
	 * @param      {Event}  e       Click Event
	 */
	handleFiles(e) {

		console.log(this.input.get(0).files);
		e.preventDefault();

	}

}