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

		if($(editorObj).length === 0) { return null; }

		let self = this;

		self.obj = new MediumEditor($(editorObj), {
			autoLink: false,
			buttonLabels: 'fontawesome',
			imageDragging: false,
			toolbar: {
				buttons: ['bold', 'italic', 'anchor', 'unorderedlist', 'orderedlist', 'h2', 'h3', 'quote']
			},
			extensions: {
				autolist: new AutoList(),
				markdown: new MeMarkdown((md) => {
					$(targetObj).val(md);
					$(targetObj).change();
				})
			},
			placeholder: {
				text: placeholder
			}
		});

	}

}