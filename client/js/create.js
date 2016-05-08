"use strict";

$(() => {
  
	$('#create-categories > li').on('click', (e) => {
		window.location.assign(e.currentTarget.dataset.link);
	});

	let mkdescription = $('input[name=create_description]');
	new MediumEditor($('#medescription'), {
		autoLink: true,
		imageDragging: false,
		toolbar: {
			buttons: ['bold', 'italic', 'anchor', 'unorderedlist', 'orderedlist', 'h2', 'h3', 'quote']
		},
		extensions: {
			autolist: new AutoList(),
			markdown: new MeMarkdown((md) => {
				mkdescription.val(md);
			})
		}
	});

});