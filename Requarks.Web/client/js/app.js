$(() => {
  
	$('nav.navbar > ul > li').on('click', (e) => {
		window.location.assign(e.currentTarget.dataset.link);
	});

});