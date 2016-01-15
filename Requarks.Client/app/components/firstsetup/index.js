"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var FirstSetup = (function (_super) {
    __extends(FirstSetup, _super);
    function FirstSetup(props) {
        var _this = this;
        _super.call(this, props);
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
                stepElement = React.createElement("div", null, React.createElement(Common.LogoAnim, null), React.createElement("h1", null, "Welcome to Requests!"), React.createElement("div", {className: "middle"}, React.createElement(Mui.List, null, React.createElement(Mui.ListItem, {primaryText: "English", leftIcon: React.createElement(MuiIcons.NavigationChevronRight, null), onClick: function () { return _this.onChooseLanguage('en'); }}), React.createElement(Mui.ListItem, {primaryText: "Français", leftIcon: React.createElement(MuiIcons.NavigationChevronRight, null), onClick: function () { return _this.onChooseLanguage('fr'); }}))));
                break;
            case 'servicedomain':
                stepElement = React.createElement("div", null, React.createElement("i", {className: "splash material-icons"}, "vpn_lock"), React.createElement("h1", null, "Enter the service domain:"), React.createElement("div", {className: "middle"}, React.createElement(Mui.Card, null, React.createElement("div", {className: "content-box"}, React.createElement("section", null, React.createElement(Mui.TextField, {hintText: React.createElement(FormattedMessage, {id: "settings.fields.service.hint"}), fullWidth: true, onChange: this.onChangeServiceDomain}), React.createElement(Common.FormFieldNote, {reqtype: "info", message: "settings.fields.service.info"}))), React.createElement(Mui.CardActions, {style: { textAlign: 'right' }}, React.createElement(Mui.RaisedButton, {label: "Connect", disabled: !this.state.service_domain_valid, onClick: this.onSaveServiceDomain, primary: true, backgroundColor: Colors.green600})))));
                break;
        }
        return (React.createElement("div", {id: "firstsetup"}, stepElement));
    };
    return FirstSetup;
}(React.Component));
module.exports = injectIntl(FirstSetup);
