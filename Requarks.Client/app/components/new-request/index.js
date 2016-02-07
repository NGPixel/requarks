"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var NewRequest = (function (_super) {
    __extends(NewRequest, _super);
    function NewRequest(props) {
        var _this = this;
        _super.call(this, props);
        this.onCategorySelect = function (nCatId) {
            var default_type = _.find(AppStore.data.types, { CategoryId: nCatId, RequestTypeIsDefault: true });
            _this.setState({
                form_category: nCatId,
                form_type: (default_type != null) ? default_type.RequestTypeId : 0
            });
        };
        this.onTypeSelect = function (ev, idx, key) {
            _this.setState({
                form_type: key
            });
        };
        this.onCustomPropertySelect = function (ev, idx, key) {
            var tempState = {};
            tempState[ev.target.dataset.fieldtarget] = key;
            _this.setState(tempState);
        };
        this.onFileBrowse = function () {
            var self = _this;
            AppStore.browse_files({
                title: "Select file(s) to attach to the request",
                defaultPath: AppConfig.static.path_desktop,
                properties: ['openFile', 'multiSelections']
            }).then(function (res) {
                if (res.length == 0)
                    return;
                self.setState({
                    uploadbox_files: AppStore.process_files(self.state.uploadbox_files, res)
                });
            });
        };
        this.onFileImport = function () {
            var self = _this;
            var res = AppStore.import_files();
            if (res.length == 0)
                return;
            self.setState({
                uploadbox_files: AppStore.process_files(self.state.uploadbox_files, res)
            });
        };
        this.onFileDragEnter = function (ev) {
            AppStore.events.dragcounter++;
            _this.setState({
                uploadbox_dragover: true
            });
        };
        this.onFileDragOver = function (ev) {
            ev.dataTransfer.dropEffect = 'copy';
            ev.stopPropagation();
            ev.preventDefault();
            return false;
        };
        this.onFileDragLeave = function (ev) {
            AppStore.events.dragcounter--;
            if (AppStore.events.dragcounter === 0) {
                _this.setState({
                    uploadbox_dragover: false
                });
            }
        };
        this.onFileDrop = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            var self = _this;
            AppStore.events.dragcounter = 0;
            self.setState({
                uploadbox_dragover: false
            });
            var res = _.values(ev.dataTransfer.files).map(function (f) {
                return f.path;
            });
            if (res.length == 0)
                return;
            self.setState({
                uploadbox_files: AppStore.process_files(self.state.uploadbox_files, res)
            });
            return false;
        };
        this.onFileRemove = function (p) {
            _this.setState({
                uploadbox_files: _.reject(_this.state.uploadbox_files, 'filepath', p)
            });
        };
        this.onDisplayTypeHelp = function () {
            _this.setState({
                modal_type_help: true
            });
        };
        this.onDismissTypeHelp = function () {
            _this.setState({
                modal_type_help: false
            });
        };
        this.onDisplayProjectHelp = function () {
            _this.setState({
                modal_project_help: true
            });
        };
        this.onDismissProjectHelp = function () {
            _this.setState({
                modal_project_help: false
            });
        };
        this.onDisplayDescriptionHelp = function () {
            _this.setState({
                modal_description_help: true
            });
        };
        this.onDismissDescriptionHelp = function () {
            _this.setState({
                modal_description_help: false
            });
        };
        this.onDisplayFilesHelp = function () {
            _this.setState({
                modal_files_help: true
            });
        };
        this.onDismissFilesHelp = function () {
            _this.setState({
                modal_files_help: false
            });
        };
        this.state = {
            form_category: 0,
            form_type: 0,
            modal_type_help: false,
            modal_project_help: false,
            modal_files_help: false,
            modal_description_help: false,
            uploadbox_dragover: false,
            uploadbox_files: []
        };
    }
    NewRequest.prototype.componentDidMount = function () {
        EE.emit('setHeaderUI', {
            navigation: 'new',
            loading: false
        });
        var tempState = {};
        AppStore.data.properties.map(function (p) {
            var fieldValue = "";
            var fieldValueKey = "form_customproperty_" + p.CategoryId + "_" + p.PropertyDefinition.PropertyDefinitionKey;
            switch (p.PropertyFieldType) {
                case 'text':
                    fieldValue = '';
                    break;
                case 'dropdown':
                    fieldValue = p.PropertyFieldDataDefault;
                    break;
            }
            tempState[fieldValueKey] = fieldValue;
        });
        this.setState(tempState);
        AppStore.events.dragcounter = 0;
    };
    ;
    NewRequest.prototype.componentWillUnmount = function () {
    };
    ;
    NewRequest.prototype.render = function () {
        var self = this;
        var categories = _.sortBy(AppStore.data.categories, 'CategoryName').map(function (c) {
            var catSelectedColor = (self.state.form_category == c.CategoryId) ? Colors.red500 : Colors.grey100;
            return (React.createElement(Mui.ListItem, {key: c.CategoryId, primaryText: c.CategoryName, secondaryText: React.createElement("div", {style: { fontSize: '12px' }}, c.CategoryDescription), secondaryTextLines: 2, leftIcon: React.createElement(Mui.FontIcon, {className: "material-icons", color: Colors[c.CategoryColor]}, c.CategoryIcon), rightIcon: React.createElement(MuiIcons.NavigationCheck, {color: catSelectedColor}), onClick: function () { return self.onCategorySelect(c.CategoryId); }}));
        });
        var category = _.find(AppStore.data.categories, 'CategoryId', self.state.form_category) || {};
        return (React.createElement("div", {className: "content-container"}, React.createElement(Flex, {alignItems: "start", justifyContent: "center"}, React.createElement(Item, {flex: 2, style: { maxWidth: '40%' }}, React.createElement(Mui.Paper, {zDepth: 2, style: { textAlign: 'left' }}, React.createElement(Mui.List, {subheader: React.createElement(FormattedMessage, {id: "new_request.category"})}, categories))), React.createElement(Item, {flex: 7, className: classNames({
            'hidden': this.state.form_category == 0
        })}, React.createElement(Mui.Card, null, React.createElement(Mui.CardHeader, {title: React.createElement(FormattedMessage, {id: "new_request.title"}), subtitle: category.CategoryName, avatar: React.createElement(Mui.Avatar, {icon: React.createElement(Mui.FontIcon, {className: "material-icons"}, category.CategoryIcon), backgroundColor: Colors[category.CategoryColor]})}), React.createElement("div", {className: "content-box"}, React.createElement(Flex, {alignItems: 'flex-start'}, React.createElement(Item, {flex: 8}, React.createElement(Flex, {alignItems: 'flex-start'}, React.createElement(Item, {flex: 6}, React.createElement("section", null, React.createElement("div", {className: "fab-right"}, React.createElement(Mui.FloatingActionButton, {mini: true, backgroundColor: Colors.red500, onClick: self.onDisplayTypeHelp}, React.createElement(MuiIcons.ActionHelpOutline, null))), React.createElement("label", null, React.createElement(FormattedMessage, {id: "new_request.fields.type.title", defaultMessage: "Type"})), React.createElement(Mui.SelectField, {value: this.state.form_type, onChange: this.onTypeSelect, fullWidth: true}, _.chain(AppStore.data.types).filter('CategoryId', category.CategoryId).sortBy('RequestTypeSortIndex').value().map(function (t) {
            return (React.createElement(Mui.MenuItem, {value: t.RequestTypeId, key: t.RequestTypeId, primaryText: t.RequestTypeName}));
        })), React.createElement(Common.FormFieldNote, {reqtype: "required", message: "new_request.fields.type.info"})), React.createElement(Mui.Dialog, {actions: [
            React.createElement(Mui.FlatButton, {label: React.createElement(FormattedMessage, {id: "new_request.actions.dismiss"}), primary: true, keyboardFocused: true, onTouchTap: this.onDismissTypeHelp})
        ], open: this.state.modal_type_help}, React.createElement("ul", {className: "new-request-typeinfo"}, _.chain(AppStore.data.types).filter('CategoryId', category.CategoryId).sortBy('RequestTypeSortIndex').value().map(function (t, idx) {
            return (React.createElement("li", {key: idx}, React.createElement("strong", null, React.createElement(MuiIcons.ActionLabel, {color: Colors[t.RequestTypeColor]}), " ", t.RequestTypeName), React.createElement("span", null, t.RequestTypeDescription)));
        })))), React.createElement(Item, {flex: 6}, React.createElement("section", null, React.createElement("div", {className: "fab-right"}, React.createElement(Mui.FloatingActionButton, {mini: true, backgroundColor: Colors.red500, onClick: self.onDisplayProjectHelp}, React.createElement(MuiIcons.ActionHelpOutline, null))), React.createElement("label", null, React.createElement(FormattedMessage, {id: "new_request.fields.project.title", defaultMessage: "Project"})), React.createElement(Mui.SelectField, {value: "none", fullWidth: true, disabled: true}, React.createElement(Mui.MenuItem, {value: "none", key: "0", primaryText: "None"})), React.createElement(Common.FormFieldNote, {reqtype: "optional", message: "new_request.fields.project.info"})), React.createElement(Mui.Dialog, {actions: [
            React.createElement(Mui.FlatButton, {label: React.createElement(FormattedMessage, {id: "new_request.actions.dismiss"}), primary: true, keyboardFocused: true, onTouchTap: this.onDismissProjectHelp})
        ], open: this.state.modal_project_help}, React.createElement("div", null, "-- Coming soon --")))), React.createElement("section", null, React.createElement("label", null, React.createElement(FormattedMessage, {id: "new_request.fields.summary.title", defaultMessage: "Summary"})), React.createElement(Mui.TextField, {hintText: React.createElement(FormattedMessage, {id: "new_request.fields.summary.hint"}), fullWidth: true}), React.createElement(Common.FormFieldNote, {reqtype: "required", message: "new_request.fields.summary.info"})), React.createElement("section", null, React.createElement("div", {className: "fab-right"}, React.createElement(Mui.FloatingActionButton, {mini: true, backgroundColor: Colors.red500, onClick: self.onDisplayDescriptionHelp}, React.createElement(MuiIcons.ActionHelpOutline, null))), React.createElement("label", null, React.createElement(FormattedMessage, {id: "new_request.fields.description.title", defaultMessage: "Description"})), React.createElement(MediumEditor, {tag: "div", className: "medium-editor", options: {
            placeholder: {
                text: this.props.intl.formatMessage({ id: 'new_request.fields.description.hint' })
            },
            buttonLabels: 'fontawesome',
            autoLink: true,
            imageDragging: false,
            targetBlank: true,
            toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'unorderedlist', 'orderedlist', 'indent', 'outdent', 'quote', 'pre'] }
        }}), React.createElement(Common.FormFieldNote, {reqtype: "required", message: "new_request.fields.description.info"})), React.createElement(Mui.Dialog, {actions: [
            React.createElement(Mui.FlatButton, {label: React.createElement(FormattedMessage, {id: "new_request.actions.dismiss"}), primary: true, keyboardFocused: true, onTouchTap: this.onDismissDescriptionHelp})
        ], open: this.state.modal_description_help}, React.createElement("div", null, "You can include special formatting in your description. Simply highlight the portion of the text you wish to format. A toolbar will appear just above with various formatting options. Links are automatically recognized and converted."))), React.createElement(Item, {flex: 4}, _.chain(AppStore.data.properties).filter('CategoryId', category.CategoryId).sortBy('PropertyFieldSortIndex').value().map(function (p, p_idx) {
            var fieldRequired = (p.PropertyIsRequired) ? "required" : "optional";
            var fieldElement = null;
            var fieldValueKey = "form_customproperty_" + p.CategoryId + "_" + p.PropertyDefinition.PropertyDefinitionKey;
            switch (p.PropertyFieldType) {
                case 'text':
                    fieldElement =
                        React.createElement(Mui.TextField, {hintText: p.PropertyFieldPlaceholder, fullWidth: true});
                    break;
                case 'dropdown':
                    if (!Validator.isJSON(p.PropertyFieldDataValues)) {
                        Winston.error('Invalid Custom Field: ID' + p.PropertyId + ' has invalid data values JSON.');
                        EE.emit('showError', 'Invalid Custom Field: ID' + p.PropertyId + ' has invalid data values JSON.');
                    }
                    var fieldDDValues = JSON.parse(p.PropertyFieldDataValues);
                    fieldElement =
                        React.createElement(Mui.SelectField, {value: self.state[fieldValueKey], onChange: self.onCustomPropertySelect, fullWidth: true}, fieldDDValues.map(function (v, idx) {
                            return (React.createElement(Mui.MenuItem, {value: v, key: idx, primaryText: React.createElement("div", {"data-fieldtarget": fieldValueKey}, v)}));
                        }));
                    break;
            }
            return (React.createElement("section", {key: p_idx}, React.createElement("label", null, p.PropertyDefinition.PropertyDefinitionName), fieldElement, React.createElement(Common.FormFieldNote, {reqtype: fieldRequired, custom: true, message: p.PropertyDefinition.PropertyDefinitionDescription})));
        }), React.createElement("section", null, React.createElement("label", null, React.createElement(FormattedMessage, {id: "new_request.fields.requested_deadline.title", defaultMessage: "Requested Deadline"})), React.createElement(Mui.DatePicker, {hintText: "YYYY/MM/DD", formatDate: this.formatDate, minDate: new Date(), autoOk: true, fullWidth: true, mode: "landscape"}), React.createElement(Common.FormFieldNote, {reqtype: "optional", message: "new_request.fields.requested_deadline.info"})), React.createElement("section", null, React.createElement("div", {className: "fab-right"}, React.createElement(Mui.FloatingActionButton, {mini: true, backgroundColor: Colors.red500, onClick: self.onDisplayFilesHelp}, React.createElement(MuiIcons.ActionHelpOutline, null))), React.createElement("div", {className: "fab-right"}, React.createElement(Mui.FloatingActionButton, {mini: true, backgroundColor: Colors.deepPurple500, onClick: self.onFileImport}, React.createElement(MuiIcons.FileFileUpload, null))), React.createElement("div", {className: "fab-right"}, React.createElement(Mui.FloatingActionButton, {mini: true, backgroundColor: Colors.deepPurple500, onClick: self.onFileBrowse}, React.createElement(MuiIcons.FileAttachment, null))), React.createElement("label", null, React.createElement(FormattedMessage, {id: "new_request.fields.files.title", defaultMessage: "Files"})), React.createElement("div", {className: classNames({
            "upload-box": true,
            "dragover": self.state.uploadbox_dragover
        }), onDrop: self.onFileDrop, onDragEnter: self.onFileDragEnter, onDragEnd: self.onFileDragLeave, onDragLeave: self.onFileDragLeave, onDragOver: self.onFileDragOver}, React.createElement("span", null, "Drag & Drop files here")), React.createElement("ul", {className: classNames({
            'upload-list': true,
            'hidden': self.state.uploadbox_files.length == 0
        })}, self.state.uploadbox_files.map(function (f, f_idx) {
            return (React.createElement("li", {key: f_idx}, React.createElement("i", {className: "material-icons", onClick: function () { return self.onFileRemove(f.filepath); }}, "clear"), React.createElement("em", null, f.filetype), React.createElement("strong", null, React.createElement(EllipsisText, {text: f.filename, length: 30, tooltip: true})), React.createElement("span", null, f.fileprop.join(', '))));
        })), React.createElement(Common.FormFieldNote, {reqtype: "optional", message: "new_request.fields.files.info"})), React.createElement("input", {type: "file", className: "hidden"}), React.createElement(Mui.Dialog, {actions: [
            React.createElement(Mui.FlatButton, {label: React.createElement(FormattedMessage, {id: "new_request.actions.dismiss"}), primary: true, keyboardFocused: true, onTouchTap: this.onDismissFilesHelp})
        ], open: this.state.modal_files_help}, React.createElement("div", null, "Files such as documents, screenshots, etc. can be attached to requests. There're 3 ways to add files:"))))), React.createElement(Mui.CardActions, {style: { textAlign: 'right' }}, React.createElement(Mui.RaisedButton, {label: React.createElement(FormattedMessage, {id: "new_request.actions.save_draft"}), primary: true, backgroundColor: Colors.grey600}), React.createElement(Mui.RaisedButton, {label: React.createElement(FormattedMessage, {id: "new_request.actions.submit_request"}), primary: true, backgroundColor: Colors.green600})))))));
    };
    NewRequest.prototype.formatDate = function (d) {
        return moment(d).format('YYYY/MM/DD');
    };
    return NewRequest;
}(React.Component));
module.exports = injectIntl(NewRequest);
