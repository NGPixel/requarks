/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface IFirstSetupProps extends React.Props<any> {}

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
          <h1>Welcome to Requests!</h1>
          <div className="middle">
            <Mui.List>
              <Mui.ListItem primaryText="English" leftIcon={<MuiIcons.NavigationChevronRight />} onClick={() => this.onChooseLanguage('en')} />
              <Mui.ListItem primaryText="Français" leftIcon={<MuiIcons.NavigationChevronRight />} onClick={() => this.onChooseLanguage('fr')} />
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
          {stepElement}
        </div>

      );
  }

}

export = injectIntl(FirstSetup);
