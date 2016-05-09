"use strict";

$(() => {
  
	$('#create-categories > li').on('click', (e) => {
		window.location.assign(e.currentTarget.dataset.link);
	});

	let meDescription = new Editor('#medescription', 'input[name=create_description]', $('#medescription').data('placeholder'));

});