"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Component = React.Component, PropTypes = React.PropTypes;
var classNames = require('classnames');
var menuTree = [{
        id: 'dashboard',
        route: '/',
        icon: 'dashboard',
        bg: 'a'
    },
    {
        id: 'review',
        route: '/review',
        icon: 'line_weight',
        bg: 'b'
    },
    {
        id: 'projects',
        route: '/projects',
        icon: 'view_carousel',
        bg: 'c'
    },
    {
        id: 'teams',
        route: '/teams',
        icon: 'people',
        bg: 'd'
    },
    {
        id: 'settings',
        route: '/settings',
        icon: 'settings',
        bg: 'f'
    }];
var Header = (function (_super) {
    __extends(Header, _super);
    function Header(props, context) {
        var _this = this;
        _super.call(this, props);
        this.setHeaderNav = function (nActiveMenu) {
            _this.setState({ activemenu: nActiveMenu });
            document.body.className = 'bg-state-' +
                (_.result(_.find(_this.state.menu, ['id', nActiveMenu]), 'bg') || 'e') +
                ((!AppConfig.data.app_useadvanimations) ? ' bg-state-direct' : '');
        };
        this.setLoading = function (nState, nFabIcon) {
            if (nFabIcon === void 0) { nFabIcon = 'import_export'; }
            _this.setState({
                loading: nState,
                fabIcon: nFabIcon || 'import_export'
            });
        };
        this.navigateTo = function (e, target) {
            if (!_this.state.loading) {
                Hist.push(target);
            }
            else {
                _this.setState({
                    snackBusyOpen: true
                });
            }
        };
        this.onDismissBusy = function () {
            _this.setState({
                snackBusyOpen: false
            });
        };
        this.state = {
            activemenu: '',
            menu: menuTree,
            fabIcon: 'add',
            loading: false,
            snackBusyOpen: false,
            input2: []
        };
    }
    Header.prototype.componentDidMount = function () {
        EE.on('setHeaderNav', this.setHeaderNav);
        EE.on('setHeaderLoading', this.setLoading);
    };
    Header.prototype.componentWillUnmount = function () {
        EE.removeListener('setHeaderNav', this.setHeaderNav);
        EE.removeListener('setHeaderLoading', this.setLoading);
    };
    Header.prototype.render = function () {
        var _this = this;
        var currentActiveMenuItem = this.state.activemenu;
        var navigateToFunc = this.navigateTo;
        var headermenu = this.state.menu.map(function (menuitem) {
            var menuItemClass = classNames({
                'active': menuitem.id == currentActiveMenuItem,
            });
            var menuItemTitle = React.createElement(FormattedMessage, {id: "header.menu." + menuitem.id, defaultMessage: menuitem.id});
            return (React.createElement("li", {key: menuitem.id, className: menuItemClass}, React.createElement(Mui.FlatButton, {label: menuItemTitle, labelPosition: "after", onClick: function (e) { return navigateToFunc(e, menuitem.route); }, labelStyle: { color: '#FFF' }}, React.createElement("i", {className: "material-icons"}, menuitem.icon))));
        });
        var headerLoadingElement = (this.state.loading) ? React.createElement("div", {className: classNames({
            'header-loading': true,
            'active': this.state.loading,
        })}, React.createElement(Mui.CircularProgress, {mode: "indeterminate", color: "rgba(255,255,255,0.6)", size: 1.1})) : null;
        var headerFABicon = (this.state.loading) ? this.state.fabIcon : 'add';
        return (React.createElement("div", {id: "header"}, React.createElement("div", {className: "header-logo"}, React.createElement("img", {src: "./images/requarks-logo-white.png", alt: ""})), React.createElement("ul", null, headermenu), React.createElement("div", {className: "header-search"}, React.createElement(Mui.AutoComplete, {inputStyle: { color: '#FFF' }, floatingLabelText: React.createElement(FormattedMessage, {id: "header.search.title", defaultMessage: "Search requests..."}), floatingLabelStyle: { color: 'rgba(255,255,255,0.8)' }, underlineStyle: { borderColor: 'rgba(255,255,255,0.8)' }, underlineFocusStyle: { borderColor: 'rgba(255,255,255,0.9)' }, hintText: React.createElement(FormattedMessage, {id: "header.search.hint_text", defaultMessage: "ID or Title"}), hintStyle: { color: 'rgba(255,255,255,0.4)' }, dataSource: this.state.input2, onUpdateInput: function (t) { console.log(t); _this.setState({ input2: [t, t + t, t + t + t] }); }, onNewRequest: function (t) { console.log('request:' + t); }})), headerLoadingElement, React.createElement("div", {className: "header-add"}, React.createElement(Mui.FloatingActionButton, {onClick: function (e) { return navigateToFunc(e, '/new'); }, style: { backgroundColor: 'transparent', backgroundImage: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.9), rgba(255,255,255,0.5))' }, backgroundColor: "transparent"}, React.createElement(Mui.FontIcon, {className: "material-icons", color: "rgba(0,0,0,0.6)"}, headerFABicon))), React.createElement(Mui.Snackbar, {message: React.createElement(FormattedMessage, {id: "header.messages.loading_busy"}), autoHideDuration: 3000, open: this.state.snackBusyOpen, onRequestClose: this.onDismissBusy})));
    };
    return Header;
}(Component));
module.exports = injectIntl(Header);
