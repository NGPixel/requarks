/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface ISettingsProps extends React.Props<any> {}

class Settings extends React.Component<ISettingsProps, any> {

  constructor(props: ISettingsProps) {
      super(props);
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

  componentDidMount() {
    EE.emit('setHeaderUI', {
      navigation: 'settings',
      loading: false
    });
  }

  componentWillUnmount() {
  }

  // =============================================
  // HANDLERS
  // =============================================

  onLogout = () => {
    ipcRenderer.send('auth-logout');
  }

  onChangeLocale = (ev,idx,key) => {
    this.setState({
      form_locale: key
    });
  }

  onChangeDefaultCategory = (ev,idx,key) => {
    this.setState({
      form_default_category: key
    });
  }

  onChangeServiceDomain = (ev) => {
    this.setState({
      form_service_domain: ev.target.value
    });
  }

  onToggleAppAutoStart = (ev,tgState) => {
    this.setState({
      form_app_autostart: tgState
    });
  }

  onToggleAppUseNotifications = (ev,tgState) => {
    this.setState({
      form_app_usenotifications: tgState
    });
  }

  onToggleAppUseEmails = (ev,tgState) => {
    this.setState({
      form_app_useemails: tgState
    });
  }

  onToggleAppUseAdvAnimations = (ev,tgState) => {
    this.setState({
      form_app_useadvanimations: tgState
    });
  }

  onDismissLocaleWarn = () => {
    this.setState({
      modalLocaleWarn: false
    });
    EE.emit('setHeaderUI', {
      loading: false
    });
  }

  onSaveSettings = () => {

    let isLoadingState = false;

    // Locale
    if(AppConfig.data.locale != this.state.form_locale) {
      this.setState({
        modalLocaleWarn: true
      });
      isLoadingState = true;
    }
    AppConfig.user.locale = this.state.form_locale;
    AppConfig.data.default_category = this.state.form_default_category;

    // App Settings
    AppConfig.data.app_autostart = this.state.form_app_autostart;
    AppConfig.data.app_usenotifications = this.state.form_app_usenotifications;
    AppConfig.data.app_useemails = this.state.form_app_useemails;
    AppConfig.data.app_useadvanimations = this.state.form_app_useadvanimations;

    // Save
    AppConfig.save();
    EE.emit('setHeaderUI', {
      loading: isLoadingState,
      navigation: 'settings'
    });

    this.setState({snackSuccessOpen: true});
  }

  onSaveService = () => {

    // Service Domain
    AppConfig.user.domain = this.state.form_service_domain;

    // Save
    AppConfig.save();

    this.setState({snackSuccessOpen: true});
  }

  onDismissSuccess = () => {
    this.setState({snackSuccessOpen: false});
  }

  // =============================================
  // RENDER
  // =============================================

  render() {

    let LocaleChoices = [
      {
        id: 'en',
        text: 'English'
      },
      {
        id: 'fr',
        text: 'Français'
      }
    ];

    let firstNameLetter = AppConfig.user.data.name.substr(0,1).toUpperCase();

    let UsrAvatar = (AppConfig.user.data.picture != null && AppConfig.user.data.picture.length > 10) ?
      <Mui.Avatar src={AppConfig.user.data.picture} size={120} />:
      <Mui.Avatar color={Colors.lightBlue50} backgroundColor={Colors.lightBlue900} size={120}>{firstNameLetter}</Mui.Avatar>;

    return(

      <div style={{overflow:'hidden', display: 'block'}}>

        <Mui.Snackbar
          message={<FormattedMessage id="settings.messages.save_success" />}
          autoHideDuration={3000}
          open={this.state.snackSuccessOpen}
          onRequestClose={this.onDismissSuccess}
          />

        <Mui.Dialog
          actions={[
            <Mui.FlatButton
              label="OK"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.onDismissLocaleWarn} />
          ]}
          open={this.state.modalLocaleWarn}>
          <FormattedMessage id="settings.messages.locale_warn_info" />
        </Mui.Dialog>

        <Flex alignItems="start" className="content-fixed-container">
            <Item flex={4}>

              <Mui.Card>
                <Mui.CardHeader
                  title={<FormattedMessage id="settings.title_account" />}
                  subtitle={AppConfig.user.data.email}
                  avatar={<Mui.Avatar icon={<MuiIcons.ActionAccountCircle />} backgroundColor={Colors.red500} />}>
                </Mui.CardHeader>
                <div className="content-box">

                  <div style={{textAlign: 'center', marginBottom: '15px'}}>
                    {UsrAvatar}
                  </div>

                  <section>
                    <strong>{AppConfig.user.data.name}</strong><br />
                    <em>Web Developer</em>
                  </section>

                  <section>
                    ---
                  </section>

                </div>
                <Mui.CardActions style={{textAlign:'center'}}>
                  <Mui.RaisedButton label={<FormattedMessage id="settings.actions.logout" />} primary={true} backgroundColor={Colors.brown500} onClick={this.onLogout} />
                </Mui.CardActions>
              </Mui.Card>

            </Item>
            <Item flex={8}>

              <Mui.Card style={{marginBottom: '15px'}}>
                <Mui.CardHeader
                  title={<FormattedMessage id="settings.title_settings" />}
                  subtitle={<FormattedMessage id="settings.subtitle_settings" />}
                  avatar={<Mui.Avatar icon={<MuiIcons.ActionSettings />} backgroundColor={Colors.red500} />}>
                </Mui.CardHeader>
                <div className="content-box">

                  <Flex alignItems={'flex-start'} className="flex-vmargin">
                    <Item flex={6}>

                      {/* LOCALE */}

                      <section>
                        <label><FormattedMessage id="settings.fields.locale.title" defaultMessage="Locale" /></label>
                        <Mui.SelectField value={this.state.form_locale} onChange={this.onChangeLocale} fullWidth={true}>
                          {LocaleChoices.map((m) => {
                            return (<Mui.MenuItem value={m.id} key={m.id} primaryText={m.text}/>)
                          })}
                        </Mui.SelectField>
                        <Common.FormFieldNote reqtype="info" message="settings.fields.locale.info" />
                      </section>

                      {/* APP SETTINGS */}

                      <section>
                        <Mui.Toggle
                          label={<FormattedMessage id="settings.fields.app_autostart.title" defaultMessage="Launch app on login" />}
                          defaultToggled={this.state.form_app_autostart}
                          onToggle={this.onToggleAppAutoStart}
                          />
                        <Mui.Toggle
                          label={<FormattedMessage id="settings.fields.app_usenotifications.title" defaultMessage="Use Desktop Notifications" />}
                          defaultToggled={this.state.form_app_usenotifications}
                          onToggle={this.onToggleAppUseNotifications}
                          />
                          <Mui.Toggle
                            label={<FormattedMessage id="settings.fields.app_useemails.title" defaultMessage="Use Email Notifications" />}
                            defaultToggled={this.state.form_app_useemails}
                            onToggle={this.onToggleAppUseEmails}
                            />
                        <Mui.Toggle
                          label={<FormattedMessage id="settings.fields.app_useadvanimations.title" defaultMessage="Use Advanced Animations" />}
                          defaultToggled={this.state.form_app_useadvanimations}
                          onToggle={this.onToggleAppUseAdvAnimations}
                          />
                      </section>

                    </Item>
                    <Item flex={6}>

                      {/* DEFAULT CATEGORY */}

                      <section>
                        <label><FormattedMessage id="settings.fields.default_category.title" defaultMessage="Default Category" /></label>
                        <Mui.SelectField value={this.state.form_default_category} onChange={this.onChangeDefaultCategory} fullWidth={true}>
                          {AppStore.data.categories.map((c) => {
                            return (<Mui.MenuItem value={c.CategoryId} key={c.CategoryId} primaryText={c.CategoryName}/>)
                          })}
                        </Mui.SelectField>
                        <Common.FormFieldNote reqtype="info" message="settings.fields.default_category.info" />
                      </section>

                    </Item>
                  </Flex>

                </div>
                <Mui.CardActions style={{textAlign:'right'}}>
                  <Mui.RaisedButton label={<FormattedMessage id="settings.actions.save" />} onClick={this.onSaveSettings} primary={true} backgroundColor={Colors.green600} />
                </Mui.CardActions>
              </Mui.Card>

              <Mui.Card>
                <Mui.CardHeader
                  title={<FormattedMessage id="settings.title_service" />}
                  subtitle={<FormattedMessage id="settings.subtitle_service" />}
                  avatar={<Mui.Avatar icon={<MuiIcons.NotificationVpnLock />} backgroundColor={Colors.red500} />}>
                </Mui.CardHeader>
                <div className="content-box">

                  {/* SERVICE DOMAIN */}

                  <section>
                    <label><FormattedMessage id="settings.fields.service.title" defaultMessage="Service Domain" /></label>
                    <Mui.TextField
                      defaultValue={this.state.form_service_domain}
                      hintText={<FormattedMessage id="settings.fields.service.hint" />}
                      fullWidth={true}
                      onChange={this.onChangeServiceDomain} />
                    <Common.FormFieldNote reqtype="info" message="settings.fields.service.info" />
                  </section>

                </div>
                <Mui.CardActions style={{textAlign:'right'}}>
                  <Mui.RaisedButton label={<FormattedMessage id="settings.actions.switchdomain" />} onClick={this.onSaveService} primary={true} backgroundColor={Colors.green600} />
                </Mui.CardActions>
              </Mui.Card>

            </Item>
        </Flex>

      </div>

    );
  }

}

export = injectIntl(Settings);
