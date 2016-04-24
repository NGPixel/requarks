'use strict';

$(function () {

	$('#create-categories > li').on('click', function (e) {
		window.location.assign(e.currentTarget.dataset.link);
	});
});