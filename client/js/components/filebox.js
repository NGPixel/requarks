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
			url: '/',
			method: 'post',
			maxFilesize: 500,
			autoProcessQueue: false,
			previewTemplate: '<li>' + prevTemplate.html() + '</li>',
			previewsContainer: id + ' > ul',
			clickable: id + ' .filebox-placeholder'
		});

		self.dz.on('addedfile', (f) => { self.addedfile(f); });
		self.dz.on('removedfile', (f) => { self.removedfile(f); });
		self.dz.on("maxfilesexceeded", (f) => { this.removeFile(f); });

	}

	/**
	 * File added to list
	 *
	 * @param      {File}  f       File object that was added
	 */
	addedfile(f) {
		$('.filebox-placeholder', this.el).addClass('hasfiles');
	}

	/**
	 * File removed from the list
	 *
	 * @param      {File}  f       File object that was removed
	 */
	removedfile(f) {
		if(this.dz.files.length < 1) {
			$('.filebox-placeholder', this.el).removeClass('hasfiles');
		}
	}

	/**
	 * Determines if at least 1 file is pending upload
	 *
	 * @return     {boolean}  True if has files, False otherwise.
	 */
	hasFiles() {
		return (this.dz.files.length > 0);
	}

	/**
	 * Starts the upload process
	 *
	 * @param      {Function}  completeCallback  The complete callback
	 * @param      {Function}  progressCallback  The progress callback
	 */
	startUpload(completeCallback, progressCallback) {

		let self = this;

		self.dz.on('queuecomplete', () => { completeCallback(self.dz.files); });
		self.dz.on('totaluploadprogress', (uploadProgress, totalBytes, totalBytesSent) => { progressCallback(uploadProgress, totalBytes, totalBytesSent); });

		self.dz.processQueue();

	}

	/**
	 * Sets the upload URL
	 *
	 * @param      {string}  destUrl  The destination url
	 */
	setUrl(destUrl) {
		this.dz.options.url = destUrl;
	}

}