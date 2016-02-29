/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface IDashboardProps extends React.Props<any> {
  sidebar: any;
}

class Dashboard extends React.Component<IDashboardProps, any> {

  constructor(props: IDashboardProps) {
      super(props);
  }

  componentDidMount() {
    EE.emit('setHeaderUI', {
      navigation: 'dashboard',
      loading: false
    });
  };

  componentWillUnmount() {

  };

  render() {

      let d = new Date("October 13, 2014 11:13:00")

      return (

        <div id="itempage">

          <div className="item-header">
            <h1 className="item-title">
              <span className="item-title-id">#435</span>
              <span className="item-title-text">Grouped services on left-hand side do not appear anywhere on mobile version of the site</span>
              <span className="item-title-subtext"><FormattedMessage id="itempage.submitted_on" values={{submitDate: d}} /></span>
            </h1>
            <Mui.Tabs className="item-tabs" tabItemContainerStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}} inkBarStyle={{backgroundColor: Colors.white}}>
              <Mui.Tab style={{color: Colors.white}} label={<span><i className="fa fa-th-large" /> <FormattedMessage id="itempage.general" /></span>}>
                <div className="item-tab">

                <Flex alignItems="start">
                  <Item flex={9}>

                    <Mui.Paper zDepth={2} style={{backgroundColor: Colors.blueGrey600}} className="item-statusbar">
                      <span>Status</span>
                      <Mui.FlatButton label="Unconfirmed" icon={<MuiIcons.ActionLabel />} labelPosition="after" style={{color:Colors.white}} hoverColor={Colors.blueGrey700} rippleColor={Colors.blueGrey900} />
                      <span>Priority</span>
                      <Mui.FlatButton label="Normal" icon={<MuiIcons.ImageAdjust />} labelPosition="after" style={{color:Colors.white}} hoverColor={Colors.blueGrey700} rippleColor={Colors.blueGrey900} />
                      <span>Type</span>
                      <Mui.FlatButton label="Bug - Minor" icon={<MuiIcons.ActionBookmark />} labelPosition="after" style={{color:Colors.white}} hoverColor={Colors.blueGrey700} rippleColor={Colors.blueGrey900} />
                    </Mui.Paper>

                    <div>
                      <div className="item-description">
                        Mavericks reality distortion gradients attenuation. Thought through and through notifications transparency game center multitasking aluminum advanced desktop operating system genius bar. This changes everything designed by Apple in California passbook. Control center photos all-new design SDK technology clock. Simplicity is actually quite complicated. Functional layers 9:41am partly cloudy minimalism. Dock airdrop slide to answer music. Video multitouch iTunes compass. Harmonious finder grid system retina animation compressor experience keynote.<br /><br />
                        Redesign services API notes system preferences. Features siri flat buttons airplane mode calculator. Missed call cover flow compare models. Wi-Fi apple care volume reminder controls. My stations folders mac power ultimate upgrade. Shop online quicktime trackpad server aperture rumors education safari one to one. Remote desktop motion business. Backlit keyboard chess phone airport extreme support iPad. Accessories magsafe terminal final cut pro. Featured TV shows downloads digital color meter. Glossy tech specs bluetooth manuals. OpenGL products FaceTime free shipping recycling mission control applications.
                      </div>
                    </div>

                    <Common.ItemBox
                      accentColor={Colors.lightBlue700}
                      title="Discussion"
                      icon="chat"
                    >
                      [description here]
                    </Common.ItemBox>

                  </Item>
                  <Item flex={3}>

                    {/* ASSIGNEE */}

                    <Common.ItemBox
                      accentColor={Colors.cyan700}
                      title="Assignee"
                      icon="face"
                      actions={
                        <Mui.RaisedButton
                          label="Assign To..."
                          labelPosition="after"
                          icon={<MuiIcons.ActionFace />}
                        />
                      }
                    >
                      <Mui.CardHeader
                        title="Emma Watson"
                        subtitle="Senior Designer"
                        avatar="http://lorempixel.com/100/100/nature/"
                        expandable={true}
                      />
                    </Common.ItemBox>

                    {/* DEADLINE */}

                    <Common.ItemBox
                      accentColor={Colors.deepOrange700}
                      title="Deadline"
                      icon="insert_invitation"
                      actions={
                        <div>
                          <Mui.RaisedButton
                            label="Confirm"
                            labelPosition="after"
                            icon={<MuiIcons.ActionDone />}
                          />
                          <Mui.RaisedButton
                            label="Set..."
                            labelPosition="after"
                            icon={<MuiIcons.HardwareKeyboardTab />}
                          />
                        </div>
                      }
                    >
                      <Mui.CardHeader
                        title="Emma Watson"
                        subtitle="Senior Designer"
                        avatar="http://lorempixel.com/100/100/nature/"
                        expandable={true}
                      />
                    </Common.ItemBox>

                    {/* PROJECT */}

                    <Common.ItemBox
                      accentColor={Colors.lightGreen700}
                      title="Project"
                      icon="view_carousel"
                      actions={
                        <Mui.RaisedButton
                          label="Set Project..."
                          labelPosition="after"
                          icon={<MuiIcons.ActionViewCarousel />}
                        />
                      }
                    >
                      <Mui.CardHeader
                        title="Emma Watson"
                        subtitle="Senior Designer"
                        avatar="http://lorempixel.com/100/100/nature/"
                        expandable={true}
                      />
                    </Common.ItemBox>

                  </Item>
                </Flex>

                </div>
              </Mui.Tab>
              <Mui.Tab style={{color: Colors.white}} label={<span><i className="fa fa-files-o" />  <FormattedMessage id="itempage.files" /></span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab style={{color: Colors.white}} label={<span><i className="fa fa-calendar" />  <FormattedMessage id="itempage.planning" /></span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab style={{color: Colors.white}} label={<span><i className="fa fa-code" />  <FormattedMessage id="itempage.dev" /></span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab style={{color: Colors.white}} label={<span><i className="fa fa-hand-pointer-o" />  <FormattedMessage id="itempage.tests" /></span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab style={{color: Colors.white}} label={<span><i className="fa fa-archive" />  <FormattedMessage id="itempage.history" /></span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
            </Mui.Tabs>
          </div>

        </div>

      );
  }

}

export = injectIntl(Dashboard);
