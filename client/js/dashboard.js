$(() => {

	$.getJSON('/images/walls/info.json').done((wallData) => {

		let rndWall = _.sample(wallData);

		$('.dashboard').css('background-image','url(/images/walls/' + rndWall.file + ')');
		$('.dashboard-caption > a').attr('href', rndWall.link);
		$('.dashboard-caption > a > strong').html(rndWall.title);
		$('.dashboard-caption > a > span').html(rndWall.author);

	});

});