"use strict";

/**
 * Editor
 */
class Editor {

	/**
	 * Constructor
	 *
	 * @class
	 *
	 * @param      {Element/String}  editorObj    Element or selector to bind to
	 * @param      {Element/String}  targetObj    The target obj
	 * @param      {String}          placeholder  Placeholder text
	 */
	constructor(editorObj, targetObj, placeholder) {

		let self = this;

		this.obj = new MediumEditor($(editorObj), {
			autoLink: true,
			buttonLabels: 'fontawesome',
			imageDragging: false,
			toolbar: {
				buttons: ['bold', 'italic', 'anchor', 'unorderedlist', 'orderedlist', 'h2', 'h3', 'quote']
			},
			extensions: {
				autolist: new AutoList(),
				markdown: new MeMarkdown((md) => {
					$(targetObj).val(md);
				})
			},
			placeholder: {
				text: placeholder
			}
		});


	}

	/**
	 * Toggle dropdown menu
	 *
	 * @param      {Event}  e       Click Event
	 */
	toggle(e) {

		if(!this.state) {
			this.open();
		} else {
			this.close();
		}

	}

}