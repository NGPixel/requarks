"use strict";

/**
 * Modal
 */
class Modal {

	/**
	 * Constructor
	 *
	 * @param      {string}  mId     Modal ID
	 */
	constructor(mId) {
		this.id = mId;
	}

	/**
	 * Show the modal
	 */
	open() {

		$(document.body).addClass('dimmed');
		$('#id-modal-' + this.id).addClass('shown');

	}

	/**
	 * Bind modal actions
	 *
	 * @param      {string}              act     Action
	 * @param      {(Function|boolean)}  clb     Callback
	 */
	bind(act, clb = false) {

		$('#id-modal-' + this.id + ' .modal-actions > button.act-' + act).one('click', (e) => {
			if(clb) {
				clb();
			} else {
				this.close();
			}
		});

	}

	/**
	 * Close the modal
	 *
	 * @param      {boolean}  immediate  Close without animation
	 */
	close(immediate = false) {
		$('#id-modal-' + this.id + ' .modal-actions > button').off('click');
		$('#id-modal-' + this.id).addClass('exit');
		_.delay(() => {
			$(document.body).removeClass('dimmed');
			$('#id-modal-' + this.id).removeClass('shown exit');
		}, (immediate) ? 0 : 500);
	}

}