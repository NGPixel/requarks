/// <reference path="../../../typings/tsd.d.ts" />

var _ = require('lodash-modern'),
    Q = require('q'),
    path = require('path'),
    fs = require('fs');

// ----------------------------------------
// ELECTRON
// ----------------------------------------

const ipcRenderer = require('electron').ipcRenderer;

// ----------------------------------------
// REACT.JS
// ----------------------------------------

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import * as React from "react";
import * as ReactDOM  from "react-dom";

// ----------------------------------------
// INTL
// ----------------------------------------

const { IntlProvider, FormattedMessage, FormattedNumber, FormattedPlural, FormattedRelative, FormattedTime, FormattedHTMLMessage, FormattedDate, injectIntl } = require('react-intl');

// ----------------------------------------
// MATERIAL-UI
// ----------------------------------------

const Mui = require('material-ui/lib');
const MuiIcons = require('material-ui/lib/svg-icons');
const Colors = require('material-ui/lib/styles/colors');

const classNames = require('classnames');
const { Flex, Item } = require('react-flex');

const RQRawTheme = require('../../js/requarks-raw-theme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

// ----------------------------------------
// VALIDATOR
// ----------------------------------------

const Validator = require('validator');

// ----------------------------------------
// FIRST-TIME SETUP APP
// ----------------------------------------

const Common = require("../../components/common");

interface IFirstSetupProps extends React.Props<any> {}

@ThemeDecorator(ThemeManager.getMuiTheme(RQRawTheme))
class FirstSetup extends React.Component<IFirstSetupProps, any> {

  constructor(props: IFirstSetupProps) {
      super(props);

      this.state = {
        step: 'lang',
        locale: 'en',
        service_domain: '',
        service_domain_valid: false
      }
  }

  componentDidMount() {

  };

  componentWillUnmount() {

  };

  onExitSetup = () => {
    ipcRenderer.send('exit-app');
  }

  onChooseLanguage = (lng) => {
    this.setState({
      locale: lng,
      step: 'servicedomain'
    })
  }

  onChangeServiceDomain = (ev) => {
    this.setState({
      service_domain: ev.target.value,
      service_domain_valid: Validator.isFQDN(ev.target.value)
    });
  }

  onSaveServiceDomain = () => {
    AppConfig.data.locale = this.state.locale;
    AppConfig.data.service_domain = this.state.service_domain;
    AppConfig.save();

    ipcRenderer.send('reload-app');

  }

  render() {

    let stepElement = null;
    switch(this.state.step) {
      case 'lang':
        stepElement = <div>
          <Common.LogoAnim />
          <h1>Welcome to Requarks!</h1>
          <div className="middle">
            <Mui.List>
              <Mui.ListItem primaryText="English" leftIcon={<MuiIcons.NavigationChevronRight />} onClick={() => this.onChooseLanguage('en')} />
              <Mui.ListItem primaryText="Francais" leftIcon={<MuiIcons.NavigationChevronRight />} onClick={() => this.onChooseLanguage('fr')} />
            </Mui.List>
          </div>
        </div>
      break;
      case 'servicedomain':
        stepElement = <div>
          <i className="splash material-icons">vpn_lock</i>
          <h1>Enter the service domain:</h1>
          <div className="middle">
            <Mui.Card>
              <div className="content-box">

                <section>
                  <Mui.TextField
                    hintText={<FormattedMessage id="settings.fields.service.hint" />}
                    fullWidth={true}
                    onChange={this.onChangeServiceDomain} />
                  <Common.FormFieldNote reqtype="info" message="settings.fields.service.info" />
                </section>

              </div>
              <Mui.CardActions style={{textAlign:'right'}}>
                <Mui.RaisedButton label="Connect" disabled={!this.state.service_domain_valid} onClick={this.onSaveServiceDomain} primary={true} backgroundColor={Colors.green600} />
              </Mui.CardActions>
            </Mui.Card>
          </div>
        </div>
      break;
    }

      return (

        <div id="firstsetup">
          <div className="fs-close">
            <Mui.FlatButton style={{minWidth: 'auto', padding: 5}} onClick={this.onExitSetup}>
              <MuiIcons.ActionHighlightOff color={Colors.grey50} />
            </Mui.FlatButton>
          </div>
          {stepElement}
        </div>

      );
  }

}

// ----------------------------------------
// INIT
// ----------------------------------------

function fsetup_init() {

  const localeMessages = require('../../intl/flattened/en');
  ReactDOM.render(
    <IntlProvider locale="en" messages={localeMessages}>
      <FirstSetup />
    </IntlProvider>,
    document.getElementById('container')
  );

}
