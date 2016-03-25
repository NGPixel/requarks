$(() => {
  
	new Vue({
		el: 'main',
		data: {
			engine: 'mssql',
			storage: 'azure',
			redis: 'tls'
		}
	});

	$('#setup-submit').on('click', (e) => {
		e.preventDefault();
		$(e.target).html('Working...').toggleClass('btn-green btn-indigo').prop('disabled', true);
		$('form').submit();
	});

});