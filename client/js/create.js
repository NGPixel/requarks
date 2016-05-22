"use strict";

/**
 * Page Logic - Create
 */
$(() => {

	// Select Category
  
	$('#create-categories > li').on('click', (e) => {
		window.location.assign(e.currentTarget.dataset.link);
	});

	// MediumEditor

	let meDescription = new Editor('#medescription', 'input[name=create_description]', $('#medescription').data('placeholder'));

	// Filebox

	let upl = new FileBox('#create_upload');

});