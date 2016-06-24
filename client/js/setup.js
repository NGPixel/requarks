$(() => {
  
	var vueSetup = new Vue({
		el: 'main',
		data: {
			storage: $('select[name=storage_provider]').data('initval') || 'azure',
			redis: $('select[name=redis_config]').data('initval') || 'tls'
		}
	});

	$('#setup-submit').on('click', (e) => {
		e.preventDefault();
		$(e.target).html('Working...').toggleClass('btn-green btn-indigo').prop('disabled', true);
		$('form').submit();
	});

});