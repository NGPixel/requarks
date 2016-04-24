'use strict';

$(function () {

	$('#id-settings-nav > li').on('click', function (e) {
		e.preventDefault();
		window.location.assign('/settings/' + e.currentTarget.dataset.link);
	});
});