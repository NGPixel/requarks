/// <reference path="../typings/tsd.d.ts" />

var _ = require('lodash-modern'),
    Q = require('q'),
    path = require('path'),
    fs = require('fs'),
    filesize = require('filesize'),
    sizeOf = require('image-size');

// ----------------------------------------
// ELECTRON
// ----------------------------------------

const ipcRenderer = require('electron').ipcRenderer;
const nativeImage = require('electron').nativeImage;

// ----------------------------------------
// WINSTON
// ----------------------------------------

var Winston = require('winston');

// ----------------------------------------
// APP MODELS + STARTUP
// ----------------------------------------

const AppConfig = require('./config');
const AppStore = require('./store');
const AppRemote = require('./remote');

let appStartupDeferred = Q.defer();

// ----------------------------------------
// HISTORY
// ----------------------------------------

const { createMemoryHistory } = require('history');
var Hist = createMemoryHistory();

// ----------------------------------------
// REACT.JS
// ----------------------------------------

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import * as React from "react";
import * as ReactDOM  from "react-dom";

// ----------------------------------------
// EVENT EMITTER
// ----------------------------------------

const EventEmitter = require('eventemitter3');
var EE = new EventEmitter();

// ----------------------------------------
// INTL
// ----------------------------------------

const { IntlProvider, FormattedMessage, FormattedNumber, FormattedPlural, FormattedRelative, FormattedTime, FormattedHTMLMessage, FormattedDate, injectIntl } = require('react-intl');
const EllipsisText  = require('react-ellipsis-text').default;

// ----------------------------------------
// ROUTER
// ----------------------------------------

const { Router, Route, Link, IndexRoute } = require('react-router');

// ----------------------------------------
// MATERIAL-UI
// ----------------------------------------

const Mui = require('material-ui/lib');
const MuiIcons = require('material-ui/lib/svg-icons');
const Colors = require('material-ui/lib/styles/colors');

const classNames = require('classnames');
const { Flex, Item } = require('react-flex');

const RQRawTheme = require('./js/requarks-raw-theme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

// ----------------------------------------
// MEDIUM EDITOR
// ----------------------------------------

const MediumEditor = require('react-medium-editor');

// ----------------------------------------
// DATAGRID
// ----------------------------------------

const DataGrid = require('react-datagrid')

// ----------------------------------------
// VALIDATOR
// ----------------------------------------

const Validator = require('validator');

// ----------------------------------------
// BASE COMPONENTS
// ----------------------------------------

const ComLoader = require("./components/loader");
const ComFirstSetup = require("./components/firstsetup");
const ComHeader = require("./components/header");
const ComSidebar = require("./components/sidebar").Sidebar;
const Common = require("./components/common");

const ComDashboard = require("./components/dashboard");
const ComNewRequest = require("./components/new-request");
const ComReview = require("./components/review");
const ComProjects = require("./components/projects");
const ComTeam = require("./components/team");
const ComSettings = require("./components/settings");

const Logo = nativeImage.createFromPath(__dirname + '/images/requests-logo.png');

// ----------------------------------------
// APP COMPONENT
// ----------------------------------------

interface IAppProps extends React.Props<any> {
  children: any,
  location: any
}

@ThemeDecorator(ThemeManager.getMuiTheme(RQRawTheme))
class App extends React.Component<IAppProps,any> {

  constructor(props: IAppProps) {
      super(props);
      this.state = {
        modalError: false,
        modalErrorText: ""
      }
  }

  componentWillMount() {

  }

  componentDidMount() {

    let self = this;
    EE.on('showError', this.onShowError);

    Q.when(appStartupDeferred.promise, function() {

      AppStore.resync().then(function() {

          Hist.push('/');
          ipcRenderer.send('app-main-loaded');
          Winston.info('Application Started Successfully');

      }, function() {
        Winston.error('Could not fetch application data statics.');
        Hist.push('/error');
        EE.emit('setHeaderLoading', true, 'error_outline');
        EE.emit('showError', "Could not fetch application data statics.");
      });

    });

  }

  componentWillUnmount() {
    EE.removeListener('showError', this.onShowError);
  }

  onShowError = (msg) => {
    this.setState({
      modalError: true,
      modalErrorText: msg
    });
  }

  onDismissError = () => {
    this.setState({
      modalError: false
    });
  }

  render() {

    return(
      <div>
        <ComHeader />
        <ComSidebar />
        <div className="main-content">
          {this.props.children}
        </div>

        <Mui.Dialog
          actions={[
            <Mui.FlatButton
              label="Dismiss"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.onDismissError} />
          ]}
          modal={true}
          open={this.state.modalError}
          title="Something went wrong">
          {this.state.modalErrorText}
        </Mui.Dialog>

      </div>
    );

  };

}

// ----------------------------------------
// ERROR PAGE COMPONENT
// ----------------------------------------

class ErrorPage extends React.Component<{},any> {

  constructor(props: any) {
      super(props);
  }

  render() {
    return(
      <div className="error-page">
        Could not recover from this error.<br />
        Try restarting the application.
      </div>
    );
  };

}

// ----------------------------------------
// INIT + ROUTER
// ----------------------------------------

function global_init() {

  // Show loading screen

  Hist.replace('/loading');

  // Initialize

  AppConfig.init().then(function() {

    // Define router

    const localeMessages = require('./intl/flattened/' + AppConfig.data.locale);
    ReactDOM.render(
      <IntlProvider locale="en" messages={localeMessages}>
        <Router history={Hist}>
          <Route path="/" component={App}>
            <IndexRoute component={ComDashboard} />
            <Route path="loading" component={ComLoader} />
            <Route path="error" component={ErrorPage} />
            <Route path="new" component={ComNewRequest} />
            <Route path="review" component={ComReview} />
            <Route path="projects" component={ComProjects} />
            <Route path="team" component={ComTeam} />
            <Route path="settings" component={ComSettings} />
          </Route>
        </Router>
      </IntlProvider>,
      document.getElementById('container')
    );

    // Initialize store

    AppStore.init();
    AppStore.prepare_local().then(function() {

      // Setup Winston

      Winston.add(Winston.transports.File, { maxsize: 500000, maxFiles: 10, filename: path.join(AppConfig.static.path,'logs/debug.log') });
      Winston.remove(Winston.transports.Console);

      // Start app

      AppRemote.init();
      appStartupDeferred.resolve();

    });

  });

  // Disable global drag-n-drop

  document.body.ondragover = function(ev) {
    if(doesAncestorsHaveClass(ev.srcElement, "upload-box")) {
      return;
    }
    ev.dataTransfer.dropEffect = 'none';
    ev.preventDefault();
    return false;
  };

  document.body.ondrop = function(ev) {
    if(doesAncestorsHaveClass(ev.srcElement, "upload-box")) {
      return;
    }
    ev.preventDefault();
    return false;
  };

}

function doesAncestorsHaveClass(element, classname) {
  if (element.classList && element.classList.contains(classname)) return true;
  return element.parentNode && doesAncestorsHaveClass(element.parentNode, classname);
}
