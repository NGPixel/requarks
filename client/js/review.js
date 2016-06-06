$(() => {

	let listTmpl = _.template($('#list-tmpl').html());

	var data = _.times(1000, (idx) => {
		return listTmpl({
			id: idx,
			summary: faker.lorem.sentence(),
			category: faker.lorem.word(),
			subcategory: faker.lorem.word(),
			priority: faker.helpers.randomize(['Low', 'Normal', 'High'])
		});
	});

	var clusterize = new Clusterize({
	  rows: data,
	  scrollId: 'review-scroll',
	  contentId: 'review-content',
	  tag: 'div',
	  no_data_class: 'list-no-data'
	});

});