"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Settings = (function (_super) {
    __extends(Settings, _super);
    function Settings(props) {
        var _this = this;
        _super.call(this, props);
        this.onLogout = function () {
            ipcRenderer.send('auth-logout');
        };
        this.onChangeLocale = function (ev, idx, key) {
            _this.setState({
                form_locale: key
            });
        };
        this.onChangeDefaultCategory = function (ev, idx, key) {
            _this.setState({
                form_default_category: key
            });
        };
        this.onChangeServiceDomain = function (ev) {
            _this.setState({
                form_service_domain: ev.target.value
            });
        };
        this.onToggleAppAutoStart = function (ev, tgState) {
            _this.setState({
                form_app_autostart: tgState
            });
        };
        this.onToggleAppUseNotifications = function (ev, tgState) {
            _this.setState({
                form_app_usenotifications: tgState
            });
        };
        this.onToggleAppUseEmails = function (ev, tgState) {
            _this.setState({
                form_app_useemails: tgState
            });
        };
        this.onToggleAppUseAdvAnimations = function (ev, tgState) {
            _this.setState({
                form_app_useadvanimations: tgState
            });
        };
        this.onDismissLocaleWarn = function () {
            _this.setState({
                modalLocaleWarn: false
            });
            EE.emit('setHeaderLoading', false);
        };
        this.onSaveSettings = function () {
            if (AppConfig.data.locale != _this.state.form_locale) {
                _this.setState({
                    modalLocaleWarn: true
                });
                EE.emit('setHeaderLoading', true, 'error_outline');
            }
            AppConfig.user.locale = _this.state.form_locale;
            AppConfig.data.default_category = _this.state.form_default_category;
            AppConfig.data.app_autostart = _this.state.form_app_autostart;
            AppConfig.data.app_usenotifications = _this.state.form_app_usenotifications;
            AppConfig.data.app_useemails = _this.state.form_app_useemails;
            AppConfig.data.app_useadvanimations = _this.state.form_app_useadvanimations;
            AppConfig.save();
            EE.emit('setHeaderNav', 'settings');
            _this.setState({ snackSuccessOpen: true });
        };
        this.onSaveService = function () {
            AppConfig.user.domain = _this.state.form_service_domain;
            AppConfig.save();
            _this.setState({ snackSuccessOpen: true });
        };
        this.onDismissSuccess = function () {
            _this.setState({ snackSuccessOpen: false });
        };
        this.state = {
            form_locale: AppConfig.user.locale,
            form_app_autostart: AppConfig.data.app_autostart,
            form_app_usenotifications: AppConfig.data.app_usenotifications,
            form_app_useemails: AppConfig.data.app_useemails,
            form_app_useadvanimations: AppConfig.data.app_useadvanimations,
            form_default_category: AppConfig.data.default_category,
            form_service_domain: AppConfig.user.domain,
            modalLocaleWarn: false,
            snackSuccessOpen: false
        };
    }
    Settings.prototype.componentDidMount = function () {
        EE.emit('setHeaderNav', 'settings');
    };
    Settings.prototype.componentWillUnmount = function () {
    };
    Settings.prototype.render = function () {
        var LocaleChoices = [
            {
                id: 'en',
                text: 'English'
            },
            {
                id: 'fr',
                text: 'Français'
            }
        ];
        var firstNameLetter = AppConfig.user.data.name.substr(0, 1).toUpperCase();
        var UsrAvatar = (AppConfig.user.data.picture != null && AppConfig.user.data.picture.length > 10) ?
            React.createElement(Mui.Avatar, {src: AppConfig.user.data.picture, size: 120}) :
            React.createElement(Mui.Avatar, {color: Colors.lightBlue50, backgroundColor: Colors.lightBlue900, size: 120}, firstNameLetter);
        return (React.createElement("div", {style: { overflow: 'hidden', display: 'block' }}, React.createElement(Mui.Snackbar, {message: React.createElement(FormattedMessage, {id: "settings.messages.save_success"}), autoHideDuration: 3000, open: this.state.snackSuccessOpen, onRequestClose: this.onDismissSuccess}), React.createElement(Mui.Dialog, {actions: [
            React.createElement(Mui.FlatButton, {label: "OK", primary: true, keyboardFocused: true, onTouchTap: this.onDismissLocaleWarn})
        ], open: this.state.modalLocaleWarn}, React.createElement(FormattedMessage, {id: "settings.messages.locale_warn_info"})), React.createElement(Flex, {alignItems: "start", className: "content-fixed-container"}, React.createElement(Item, {flex: 4}, React.createElement(Mui.Card, null, React.createElement(Mui.CardHeader, {title: React.createElement(FormattedMessage, {id: "settings.title_account"}), subtitle: AppConfig.user.data.email, avatar: React.createElement(Mui.Avatar, {icon: React.createElement(MuiIcons.ActionAccountCircle, null), backgroundColor: Colors.red500})}), React.createElement("div", {className: "content-box"}, React.createElement("div", {style: { textAlign: 'center', marginBottom: '15px' }}, UsrAvatar), React.createElement("section", null, React.createElement("strong", null, AppConfig.user.data.name), React.createElement("br", null), React.createElement("em", null, "Web Developer")), React.createElement("section", null, "---")), React.createElement(Mui.CardActions, {style: { textAlign: 'center' }}, React.createElement(Mui.RaisedButton, {label: React.createElement(FormattedMessage, {id: "settings.actions.logout"}), primary: true, backgroundColor: Colors.brown500, onClick: this.onLogout})))), React.createElement(Item, {flex: 8}, React.createElement(Mui.Card, {style: { marginBottom: '15px' }}, React.createElement(Mui.CardHeader, {title: React.createElement(FormattedMessage, {id: "settings.title_settings"}), subtitle: React.createElement(FormattedMessage, {id: "settings.subtitle_settings"}), avatar: React.createElement(Mui.Avatar, {icon: React.createElement(MuiIcons.ActionSettings, null), backgroundColor: Colors.red500})}), React.createElement("div", {className: "content-box"}, React.createElement(Flex, {alignItems: 'flex-start', className: "flex-vmargin"}, React.createElement(Item, {flex: 6}, React.createElement("section", null, React.createElement("label", null, React.createElement(FormattedMessage, {id: "settings.fields.locale.title", defaultMessage: "Locale"})), React.createElement(Mui.SelectField, {value: this.state.form_locale, onChange: this.onChangeLocale, fullWidth: true}, LocaleChoices.map(function (m) {
            return (React.createElement(Mui.MenuItem, {value: m.id, key: m.id, primaryText: m.text}));
        })), React.createElement(Common.FormFieldNote, {reqtype: "info", message: "settings.fields.locale.info"})), React.createElement("section", null, React.createElement(Mui.Toggle, {label: React.createElement(FormattedMessage, {id: "settings.fields.app_autostart.title", defaultMessage: "Launch app on login"}), defaultToggled: this.state.form_app_autostart, onToggle: this.onToggleAppAutoStart}), React.createElement(Mui.Toggle, {label: React.createElement(FormattedMessage, {id: "settings.fields.app_usenotifications.title", defaultMessage: "Use Desktop Notifications"}), defaultToggled: this.state.form_app_usenotifications, onToggle: this.onToggleAppUseNotifications}), React.createElement(Mui.Toggle, {label: React.createElement(FormattedMessage, {id: "settings.fields.app_useemails.title", defaultMessage: "Use Email Notifications"}), defaultToggled: this.state.form_app_useemails, onToggle: this.onToggleAppUseEmails}), React.createElement(Mui.Toggle, {label: React.createElement(FormattedMessage, {id: "settings.fields.app_useadvanimations.title", defaultMessage: "Use Advanced Animations"}), defaultToggled: this.state.form_app_useadvanimations, onToggle: this.onToggleAppUseAdvAnimations}))), React.createElement(Item, {flex: 6}, React.createElement("section", null, React.createElement("label", null, React.createElement(FormattedMessage, {id: "settings.fields.default_category.title", defaultMessage: "Default Category"})), React.createElement(Mui.SelectField, {value: this.state.form_default_category, onChange: this.onChangeDefaultCategory, fullWidth: true}, AppStore.data.categories.map(function (c) {
            return (React.createElement(Mui.MenuItem, {value: c.CategoryId, key: c.CategoryId, primaryText: c.CategoryName}));
        })), React.createElement(Common.FormFieldNote, {reqtype: "info", message: "settings.fields.default_category.info"}))))), React.createElement(Mui.CardActions, {style: { textAlign: 'right' }}, React.createElement(Mui.RaisedButton, {label: React.createElement(FormattedMessage, {id: "settings.actions.save"}), onClick: this.onSaveSettings, primary: true, backgroundColor: Colors.green600}))), React.createElement(Mui.Card, null, React.createElement(Mui.CardHeader, {title: React.createElement(FormattedMessage, {id: "settings.title_service"}), subtitle: React.createElement(FormattedMessage, {id: "settings.subtitle_service"}), avatar: React.createElement(Mui.Avatar, {icon: React.createElement(MuiIcons.NotificationVpnLock, null), backgroundColor: Colors.red500})}), React.createElement("div", {className: "content-box"}, React.createElement("section", null, React.createElement("label", null, React.createElement(FormattedMessage, {id: "settings.fields.service.title", defaultMessage: "Service Domain"})), React.createElement(Mui.TextField, {defaultValue: this.state.form_service_domain, hintText: React.createElement(FormattedMessage, {id: "settings.fields.service.hint"}), fullWidth: true, onChange: this.onChangeServiceDomain}), React.createElement(Common.FormFieldNote, {reqtype: "info", message: "settings.fields.service.info"}))), React.createElement(Mui.CardActions, {style: { textAlign: 'right' }}, React.createElement(Mui.RaisedButton, {label: React.createElement(FormattedMessage, {id: "settings.actions.switchdomain"}), onClick: this.onSaveService, primary: true, backgroundColor: Colors.green600})))))));
    };
    return Settings;
}(React.Component));
module.exports = injectIntl(Settings);
