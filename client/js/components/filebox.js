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
	 * @param      {String}  id      Selector to bind to
	 */
	constructor(id) {

		let self = this;

		let prevTemplate = $('ul > li', id).detach();

		self.el = $(id);
		self.dz = new Dropzone(id, {
			url: '/create/technical',
			method: 'post',
			maxFilesize: 500,
			autoProcessQueue: false,
			previewTemplate: '<li>' + prevTemplate.html() + '</li>',
			previewsContainer: id + ' > ul',
			clickable: id + ' .filebox-placeholder'
		});

		self.dz.on('addedfile', (f) => { self.addedfile(f); });
		self.dz.on('removedfile', (f) => { self.removedfile(f); });

	}

	/**
	 * File added to list
	 *
	 * @param      {File}  f       File object that was added
	 */
	addedfile(f) {

		let self = this;

		$('.filebox-placeholder', self.el).addClass('hasfiles');

	}

	/**
	 * File removed from the list
	 *
	 * @param      {File}  f       File object that was removed
	 */
	removedfile(f) {

		let self = this;

		if(self.dz.files.length < 1) {
			$('.filebox-placeholder', self.el).removeClass('hasfiles');
		}

	}

}