"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _ = require('lodash-modern'), Q = require('q'), path = require('path'), fs = require('fs');
var ipcRenderer = require('electron').ipcRenderer;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var React = require("react");
var ReactDOM = require("react-dom");
var _a = require('react-intl'), IntlProvider = _a.IntlProvider, FormattedMessage = _a.FormattedMessage, FormattedNumber = _a.FormattedNumber, FormattedPlural = _a.FormattedPlural, FormattedRelative = _a.FormattedRelative, FormattedTime = _a.FormattedTime, FormattedHTMLMessage = _a.FormattedHTMLMessage, FormattedDate = _a.FormattedDate, injectIntl = _a.injectIntl;
var Mui = require('material-ui/lib');
var MuiIcons = require('material-ui/lib/svg-icons');
var Colors = require('material-ui/lib/styles/colors');
var classNames = require('classnames');
var _b = require('react-flex'), Flex = _b.Flex, Item = _b.Item;
var RQRawTheme = require('../../js/requests-raw-theme');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var ThemeDecorator = require('material-ui/lib/styles/theme-decorator');
var Validator = require('validator');
var Common = require("../../components/common");
var FirstSetup = (function (_super) {
    __extends(FirstSetup, _super);
    function FirstSetup(props) {
        var _this = this;
        _super.call(this, props);
        this.onExitSetup = function () {
            ipcRenderer.send('exit-app');
        };
        this.onChooseLanguage = function (lng) {
            _this.setState({
                locale: lng,
                step: 'servicedomain'
            });
        };
        this.onChangeServiceDomain = function (ev) {
            _this.setState({
                service_domain: ev.target.value,
                service_domain_valid: Validator.isFQDN(ev.target.value)
            });
        };
        this.onSaveServiceDomain = function () {
            AppConfig.data.locale = _this.state.locale;
            AppConfig.data.service_domain = _this.state.service_domain;
            AppConfig.save();
            ipcRenderer.send('reload-app');
        };
        this.state = {
            step: 'lang',
            locale: 'en',
            service_domain: '',
            service_domain_valid: false
        };
    }
    FirstSetup.prototype.componentDidMount = function () {
    };
    ;
    FirstSetup.prototype.componentWillUnmount = function () {
    };
    ;
    FirstSetup.prototype.render = function () {
        var _this = this;
        var stepElement = null;
        switch (this.state.step) {
            case 'lang':
                stepElement = React.createElement("div", null, React.createElement(Common.LogoAnim, null), React.createElement("h1", null, "Welcome to Requests!"), React.createElement("div", {className: "middle"}, React.createElement(Mui.List, null, React.createElement(Mui.ListItem, {primaryText: "English", leftIcon: React.createElement(MuiIcons.NavigationChevronRight, null), onClick: function () { return _this.onChooseLanguage('en'); }}), React.createElement(Mui.ListItem, {primaryText: "Francais", leftIcon: React.createElement(MuiIcons.NavigationChevronRight, null), onClick: function () { return _this.onChooseLanguage('fr'); }}))));
                break;
            case 'servicedomain':
                stepElement = React.createElement("div", null, React.createElement("i", {className: "splash material-icons"}, "vpn_lock"), React.createElement("h1", null, "Enter the service domain:"), React.createElement("div", {className: "middle"}, React.createElement(Mui.Card, null, React.createElement("div", {className: "content-box"}, React.createElement("section", null, React.createElement(Mui.TextField, {hintText: React.createElement(FormattedMessage, {id: "settings.fields.service.hint"}), fullWidth: true, onChange: this.onChangeServiceDomain}), React.createElement(Common.FormFieldNote, {reqtype: "info", message: "settings.fields.service.info"}))), React.createElement(Mui.CardActions, {style: { textAlign: 'right' }}, React.createElement(Mui.RaisedButton, {label: "Connect", disabled: !this.state.service_domain_valid, onClick: this.onSaveServiceDomain, primary: true, backgroundColor: Colors.green600})))));
                break;
        }
        return (React.createElement("div", {id: "firstsetup"}, React.createElement("div", {className: "fs-close"}, React.createElement(Mui.FlatButton, {style: { minWidth: 'auto', padding: 5 }, onClick: this.onExitSetup}, React.createElement(MuiIcons.ActionHighlightOff, {color: Colors.grey50}))), stepElement));
    };
    FirstSetup = __decorate([
        ThemeDecorator(ThemeManager.getMuiTheme(RQRawTheme)), 
        __metadata('design:paramtypes', [Object])
    ], FirstSetup);
    return FirstSetup;
}(React.Component));
function fsetup_init() {
    var localeMessages = require('../../intl/flattened/en');
    ReactDOM.render(React.createElement(IntlProvider, {locale: "en", messages: localeMessages}, React.createElement(FirstSetup, null)), document.getElementById('container'));
}
