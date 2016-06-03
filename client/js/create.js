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
	let dpDeadline = new Pikaday({
		field: $('input[name=create_deadline]').get(0),
		format: 'YYYY/MM/DD',
		minDate: moment().toDate()
	});

	let vueCreateReq = new Vue({
		el: '#create-form',
		data: {
			title: '',
			description: '',
			subcategory: ''
		}
	});

	// --------------------------
	// Create request
	// --------------------------

	$('#create-submit').on('click', (e) => {

		// Open progress modal

		$('#notifload').addClass('active');

		let md = new Modal('createrequest');
		md.open().then(() => {

			// Send form

			$.ajax({
				cache: false,
				data: vueCreateReq.$data,
				dataType: 'json',
				method: 'POST',
				url: window.location.pathname
			}).done((resp) => {

				if(resp.state === 'ok') {

					// Proceed with attachment(s) (if any)

					

				} else {

					// Show first error

					md.close();
					$('#notifload').removeClass('active');

					let fldTitle = $('label[for=fld_' + resp.errors[0].param + ']').html() || resp.errors[0].param;

					alerts.push({
						class: 'error',
						title: fldTitle,
						message: resp.errors[0].msg,
						iconClass: 'fa-times-circle'
					});

				}

			}).fail((xhr, status, err) => {

				// Connection failed

				md.close();
				$('#notifload').removeClass('active');

				alerts.push({
					class: 'error',
					title: 'Connection Error',
					message:  err,
					iconClass: 'fa-plug'
				});
				
			});

		});

	});

});