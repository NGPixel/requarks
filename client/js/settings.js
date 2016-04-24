$(() => {

	$('#id-settings-nav > li').on('click', (e) => {
		e.preventDefault();
		window.location.assign('/settings/' + e.currentTarget.dataset.link);
	});

});