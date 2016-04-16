$(() => {

	$('#id-teams-list > li').on('click', (e) => {
		e.preventDefault();
		window.location.assign(e.currentTarget.dataset.link);
	});

	$('#edit-delete').on('click', (e) => {
		$(document.body).addClass('dimmed');
		$('.modal').addClass('shown');
	});

	$('#id-modal-cancel').on('click', (e) => {
		$('.modal').addClass('exit');
		_.delay(() => {
			$(document.body).removeClass('dimmed');
			$('.modal').removeClass('shown exit');
		}, 500);
	});

});