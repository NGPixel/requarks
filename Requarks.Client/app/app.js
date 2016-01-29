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
var _ = require('lodash'), Q = require('q'), path = require('path'), fs = require('fs'), filesize = require('filesize'), sizeOf = require('image-size');
var ipcRenderer = require('electron').ipcRenderer;
var nativeImage = require('electron').nativeImage;
var Winston = require('winston');
var AppConfig = require('./config');
var AppStore = require('./store');
var AppRemote = require('./remote');
var appStartupDeferred = Q.defer();
var createMemoryHistory = require('history').createMemoryHistory;
var Hist = createMemoryHistory();
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var React = require("react");
var ReactDOM = require("react-dom");
var EventEmitter = require('eventemitter3');
var EE = new EventEmitter();
var _a = require('react-intl'), IntlProvider = _a.IntlProvider, FormattedMessage = _a.FormattedMessage, FormattedNumber = _a.FormattedNumber, FormattedPlural = _a.FormattedPlural, FormattedRelative = _a.FormattedRelative, FormattedTime = _a.FormattedTime, FormattedHTMLMessage = _a.FormattedHTMLMessage, FormattedDate = _a.FormattedDate, injectIntl = _a.injectIntl;
var EllipsisText = require('react-ellipsis-text').default;
var _b = require('react-router'), Router = _b.Router, Route = _b.Route, Link = _b.Link, IndexRoute = _b.IndexRoute;
var Mui = require('material-ui/lib');
var MuiIcons = require('material-ui/lib/svg-icons');
var Colors = require('material-ui/lib/styles/colors');
var classNames = require('classnames');
var _c = require('react-flex'), Flex = _c.Flex, Item = _c.Item;
var RQRawTheme = require('./js/requarks-raw-theme');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var ThemeDecorator = require('material-ui/lib/styles/theme-decorator');
var MediumEditor = require('react-medium-editor');
var _d = require('react-virtualized'), VirtualScroll = _d.VirtualScroll, FlexTable = _d.FlexTable, FlexColumn = _d.FlexColumn;
var Validator = require('validator');
var ComLoader = require("./components/loader");
var ComFirstSetup = require("./components/firstsetup");
var ComHeader = require("./components/header");
var ComSidebar = require("./components/sidebar").Sidebar;
var Common = require("./components/common");
var ComDashboard = require("./components/dashboard");
var ComNewRequest = require("./components/new-request");
var ComReview = require("./components/review");
var ComProjects = require("./components/projects");
var ComTeams = require("./components/teams");
var ComSettings = require("./components/settings");
var Logo = nativeImage.createFromPath(__dirname + '/images/requests-logo.png');
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = this;
        _super.call(this, props);
        this.onShowError = function (msg) {
            _this.setState({
                modalError: true,
                modalErrorText: msg
            });
        };
        this.onDismissError = function () {
            _this.setState({
                modalError: false
            });
        };
        this.state = {
            modalError: false,
            modalErrorText: ""
        };
    }
    App.prototype.componentWillMount = function () {
    };
    App.prototype.componentDidMount = function () {
        var self = this;
        EE.on('showError', this.onShowError);
        Q.when(appStartupDeferred.promise, function () {
            AppStore.resync().then(function () {
                Hist.push('/');
                ipcRenderer.send('app-main-loaded');
                Winston.info('Application Started Successfully');
            }, function () {
                Winston.error('Could not fetch application data statics.');
                Hist.push('/error');
                EE.emit('setHeaderLoading', true, 'error_outline');
                EE.emit('showError', "Could not fetch application data statics.");
            });
        });
    };
    App.prototype.componentWillUnmount = function () {
        EE.removeListener('showError', this.onShowError);
    };
    App.prototype.render = function () {
        return (React.createElement("div", null, React.createElement(ComHeader, null), React.createElement(ComSidebar, null), React.createElement("div", {className: "main-content"}, this.props.children), React.createElement(Mui.Dialog, {actions: [
            React.createElement(Mui.FlatButton, {label: "Dismiss", primary: true, keyboardFocused: true, onTouchTap: this.onDismissError})
        ], modal: true, open: this.state.modalError, title: "Something went wrong"}, this.state.modalErrorText)));
    };
    ;
    App = __decorate([
        ThemeDecorator(ThemeManager.getMuiTheme(RQRawTheme)), 
        __metadata('design:paramtypes', [Object])
    ], App);
    return App;
}(React.Component));
var ErrorPage = (function (_super) {
    __extends(ErrorPage, _super);
    function ErrorPage(props) {
        _super.call(this, props);
    }
    ErrorPage.prototype.render = function () {
        return (React.createElement("div", {className: "error-page"}, "Could not recover from this error.", React.createElement("br", null), "Try restarting the application."));
    };
    ;
    return ErrorPage;
}(React.Component));
function global_init() {
    Hist.replace('/loading');
    AppConfig.init().then(function () {
        var localeMessages = require('./intl/flattened/' + AppConfig.data.locale);
        ReactDOM.render(React.createElement(IntlProvider, {locale: "en", messages: localeMessages}, React.createElement(Router, {history: Hist}, React.createElement(Route, {path: "/", component: App}, React.createElement(IndexRoute, {component: ComDashboard}), React.createElement(Route, {path: "loading", component: ComLoader}), React.createElement(Route, {path: "error", component: ErrorPage}), React.createElement(Route, {path: "new", component: ComNewRequest}), React.createElement(Route, {path: "review", component: ComReview}), React.createElement(Route, {path: "projects", component: ComProjects}), React.createElement(Route, {path: "teams", component: ComTeams}), React.createElement(Route, {path: "settings", component: ComSettings})))), document.getElementById('container'));
        AppStore.init();
        AppStore.prepare_local().then(function () {
            Winston.add(Winston.transports.File, { maxsize: 500000, maxFiles: 10, filename: path.join(AppConfig.static.path, 'logs/debug.log') });
            Winston.remove(Winston.transports.Console);
            AppRemote.init();
            appStartupDeferred.resolve();
        });
    });
    document.body.ondragover = function (ev) {
        if (doesAncestorsHaveClass(ev.srcElement, "upload-box")) {
            return;
        }
        ev.dataTransfer.dropEffect = 'none';
        ev.preventDefault();
        return false;
    };
    document.body.ondrop = function (ev) {
        if (doesAncestorsHaveClass(ev.srcElement, "upload-box")) {
            return;
        }
        ev.preventDefault();
        return false;
    };
}
function doesAncestorsHaveClass(element, classname) {
    if (element.classList && element.classList.contains(classname))
        return true;
    return element.parentNode && doesAncestorsHaveClass(element.parentNode, classname);
}
