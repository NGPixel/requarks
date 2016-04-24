'use strict';

$(function () {

	$('#id-teams-list > li').on('click', function (e) {
		e.preventDefault();
		window.location.assign(e.currentTarget.dataset.link);
	});

	$('#edit-delete').on('click', function (e) {

		var md = new Modal('teamdelete');
		md.bind('cancel');
		md.bind('ok', function () {
			$('#notifload').addClass('active');
			md.close(true);
		});
		md.open();
	});
});