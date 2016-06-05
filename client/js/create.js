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

		md.setContent('label', modalIntl.processing);

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

					let compFunc = (f) => {

						if(!_.isNil(f) && _.some(f, ['status','error'])) {

							//-> Error during upload

							md.close(true);

							let mdUplError = new Modal('createuplerror');
							mdUplError.bind('ok', () => {
								window.location.assign('/item/' + resp.id);
							});
							mdUplError.open();

						} else {

							//-> Upload successful

							md.getElement('i.spinner').removeClass('alt');
							md.setContent('label', modalIntl.finishing);

							window.location.assign('/item/' + resp.id);

						}

					};

					if(fbAttachments.hasFiles()) {

						md.getElement('i.spinner').addClass('alt');
						md.setContent('label', modalIntl.attachments);

						fbAttachments.setUrl('/item/' + resp.id + '/upload');

						fbAttachments.startUpload(compFunc,
							(uploadProgress, totalBytes, totalBytesSent) => {
								md.setContent('label', modalIntl.attachments + ' ' + _.ceil(uploadProgress) + '%');
							}
						);

					} else {

						compFunc(null);

					}
					
				} else {

					// Show first error

					md.close();
					$('#notifload').removeClass('active');

					let fldTitle = $('label[for=fld_' + resp.errors[0].param + ']').html() || resp.errors[0].param;

					alerts.push({
						class: 'error',
						title: 'Form Error',
						message: fldTitle + ' ' + resp.errors[0].msg,
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