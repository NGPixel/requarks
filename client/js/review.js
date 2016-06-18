$(() => {

	let listRowTmpl = _.template($('#list-row-tmpl').html());
	let listStatusTmpl = _.template($('#list-status-tmpl').html());

	let priorities = ['high','normal','low', ''];
	let statuses = ['Unconfirmed','Under Analysis','Queued','In Progress','Completed'];

	// TEMP - Fake data generator

	var fakeData = _.times(50, (idx) => {
		return {
			id: idx + 1,
			summary: faker.lorem.sentence(),
			category: 'Technical',
			subcategory: _.sample(['Bug - Critical','Bug - Major','Bug - Normal','Bug - Minor','Enhancement','New Feature']),
			status: _.sample(statuses),
			project: '',
			priority: _.sample(priorities),
			avatar: faker.image.avatar(),
			parent: 0
		}
	});

	// SORT

	let rowsSorted = _.sortBy(fakeData, (v) => {
		return _.indexOf(statuses, v.status);
	}, (v) => {
		return _.indexOf(priorities, v.priority);
	});

	// RELOCATE CHILDREN

	let rowsByParent = _.groupBy(rowsSorted, 'parent');
	let rows = [];

	_(rowsByParent[0]).forEach((v, idx) => {
		rows.push(v);
		if(v.id > 0 && v.id in rowsByParent) {
			rows = rows.concat(rowsByParent[v.id]);
		}
	});

	// BUILD FROM TEMPLATES

	let curStatus = '';
	let data = [];
	_(rows).forEach((v, k) => {
		if(curStatus !== v.status && v.parent == 0) {
			curStatus = v.status;
			data.push(listStatusTmpl({
				statusName: v.status
			}));
		}
		data.push(listRowTmpl({
			id: v.id,
			summary: v.summary,
			priority: v.priority,
			labels: (() => {
				
				let lbls = [];

				// Category
				
				lbls.push({
					title: v.category,
					color: 'red'
				});

				// Subcategory
				
				lbls.push({
					title: v.subcategory,
					color: 'brown'
				});

				return lbls;

			})(),
			avatar: v.avatar,
			rowClass: (v.parent > 0) ? 'sub' : 'main'
		}));
	});

	// BUILD CLUSTERS

	var clusterize = new Clusterize({
	  rows: data,
	  scrollId: 'review-scroll',
	  contentId: 'review-content',
	  tag: 'div',
	  no_data_class: 'list-no-data'
	});

});