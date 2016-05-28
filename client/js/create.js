"use strict";

/**
 * Page Logic - Create
 */
$(() => {

	// --------------------------
	// Select Category
	// --------------------------
  
	$('#create-categories > li').on('click', (e) => {
		window.location.assign(e.currentTarget.dataset.link);
	});

	// --------------------------
	// Components Initialization
	// --------------------------

	let meDescription = new Editor('#medescription', 'input[name=create_description]', $('#medescription').data('placeholder'));
	let fbAttachments = new FileBox('#create_upload');

	// --------------------------
	// Create request
	// --------------------------

	$('#create-submit').on('click', (e) => {

		// Open progress modal

		$('#notifload').addClass('active');

		let md = new Modal('createrequest');
		md.open();

		// Send form

		$.ajax({
			cache: false,
			data: {},
			dataType: 'json',
			method: 'POST',
			url: window.location.pathname
		}).done((resp) => {




		}).fail((xhr, status, err) => {

			md.close();
			$('#notifload').removeClass('active');
			
		});

	});

});