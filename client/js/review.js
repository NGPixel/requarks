$(() => {

	let listRowTmpl = _.template($('#list-row-tmpl').html());
	let listStatusTmpl = _.template($('#list-status-tmpl').html());

	var data = _.times(10000, (idx) => {
		if(idx % 20 === 0) {
			return listStatusTmpl({

			});
		} else {
			return listRowTmpl({
				id: idx,
				summary: faker.lorem.sentence(),
				category: faker.lorem.word(),
				subcategory: faker.lorem.word(),
				project: faker.lorem.word()
			});
		}
	});

	var clusterize = new Clusterize({
	  rows: data,
	  scrollId: 'review-scroll',
	  contentId: 'review-content',
	  tag: 'div',
	  no_data_class: 'list-no-data'
	});

});