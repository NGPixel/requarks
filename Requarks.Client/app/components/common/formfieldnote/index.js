"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var FormFieldNote = (function (_super) {
    __extends(FormFieldNote, _super);
    function FormFieldNote(props) {
        _super.call(this, props);
    }
    FormFieldNote.prototype.render = function () {
        var typeColor = 'color-red';
        var typeText;
        switch (this.props.reqtype) {
            case 'required':
                typeColor = 'color-red';
                typeText = React.createElement(FormattedMessage, {id: "form_field_note.required"});
                break;
            case 'optional':
                typeColor = 'color-orange';
                typeText = React.createElement(FormattedMessage, {id: "form_field_note.optional"});
                break;
            case 'info':
                typeColor = 'color-blue';
                typeText = React.createElement(FormattedMessage, {id: "form_field_note.info"});
                break;
        }
        return (React.createElement("div", {className: "note"}, React.createElement("strong", {className: typeColor}, typeText), " | ", (this.props.custom) ? this.props.message : React.createElement(FormattedMessage, {id: this.props.message})));
    };
    return FormFieldNote;
}(React.Component));
module.exports = FormFieldNote;
