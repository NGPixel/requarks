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

        <div id="itempage" className="content-container">

          <div className="item-header">
            <h1 className="item-title">
              <span className="item-title-id">#435</span>
              <span className="item-title-text">Grouped services on left-hand side do not appear anywhere on mobile version of the site</span>
              <span className="item-title-subtext"><FormattedMessage id="itempage.submitted_on" values={{submitDate: d}} /></span>
            </h1>
            <Mui.Tabs className="item-tabs" tabItemContainerStyle={{backgroundColor: 'transparent'}} inkBarStyle={{backgroundColor: Colors.white}}>
              <Mui.Tab label={<span><i className="fa fa-th-large" /> <FormattedMessage id="itempage.general" /></span>}>
                <div className="item-tab">

                <Flex alignItems="start">
                  <Item flex={9}>

                    <Mui.Paper zDepth={2} style={{backgroundColor: Colors.grey100, padding: 15}} className="item-content">
                      [description here]
                    </Mui.Paper>

                  </Item>
                  <Item flex={3}>

                    {/* ASSIGNEE */}

                    <Common.ItemBox
                      accentColor={Colors.lightBlue700}
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
              <Mui.Tab label={<span><i className="fa fa-files-o" />  <FormattedMessage id="itempage.files" /></span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab label={<span><i className="fa fa-calendar" />  <FormattedMessage id="itempage.planning" /></span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab label={<span><i className="fa fa-code" />  <FormattedMessage id="itempage.dev" /></span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab label={<span><i className="fa fa-hand-pointer-o" />  <FormattedMessage id="itempage.tests" /></span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab label={<span><i className="fa fa-archive" />  <FormattedMessage id="itempage.history" /></span>}>
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
