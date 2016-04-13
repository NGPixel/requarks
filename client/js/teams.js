$(() => {

	$('#id-teams-list > li').on('click', (e) => {
		e.preventDefault();
		window.location.assign(e.currentTarget.dataset.link);
	});

});