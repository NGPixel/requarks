$(() => {

	$('#id-teams-list > li').on('click', (e) => {
		e.preventDefault();
		window.location.assign(e.currentTarget.dataset.link);
	});

	$('#edit-delete').on('click', (e) => {

		let md = new Modal('teamdelete');
		md.bind('cancel');
		md.bind('ok', () => {
			$('#notifload').addClass('active');
			md.close(true);
		});
		md.open();

	});

});