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

      return (

        <div id="itempage" className="content-container">

          <div className="item-header">
            <h1 className="item-title">
              <span className="item-title-id">#435</span>
              Grouped services on left-hand side do not appear anywhere on mobile version of the site
            </h1>
            <Mui.Tabs className="item-tabs" tabItemContainerStyle={{backgroundColor: 'transparent'}} inkBarStyle={{backgroundColor: Colors.white}}>
              <Mui.Tab label={<span><i className="fa fa-th-large" /> General</span>}>
                <div className="item-tab">

                <Flex alignItems="start">
                  <Item flex={9}>

                    <Mui.Paper zDepth={2} style={{backgroundColor: Colors.grey100}} className="item-content">
                      =-=-=-
                    </Mui.Paper>

                  </Item>
                  <Item flex={3}>

                    {/* ASSIGNEE */}

                    <Mui.Card className="item-box" initiallyExpanded={true}>
                      <Mui.CardTitle
                        title="Assignee"
                        titleColor={Colors.white}
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={{backgroundColor: Colors.lightBlue700}}
                      />
                      <Mui.CardHeader
                        title="Emma Watson"
                        subtitle="Senior Designer"
                        avatar="http://lorempixel.com/100/100/nature/"
                        expandable={true}
                      />
                      <Mui.CardActions expandable={true}>
                        <Mui.RaisedButton
                          label="Assign To..."
                          labelPosition="after"
                          icon={<MuiIcons.ActionFace />}
                        />
                      </Mui.CardActions>
                    </Mui.Card>

                    {/* DEADLINE */}

                    <Mui.Card className="item-box" initiallyExpanded={false}>
                      <Mui.CardTitle
                        title="Deadline"
                        titleColor={Colors.white}
                        subtitle="Tomorrow"
                        subtitleColor={Colors.deepOrange100}
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={{backgroundColor: Colors.deepOrange700}}
                      />

                        <Mui.CardHeader
                          title="Emma Watson"
                          subtitle="Senior Designer"
                          avatar="http://lorempixel.com/100/100/nature/"
                          expandable={true}
                        />

                      <Mui.CardActions expandable={true}>
                        <Mui.RaisedButton
                          label="Assign To..."
                          labelPosition="after"
                          icon={<MuiIcons.ActionFace />}
                        />
                      </Mui.CardActions>
                    </Mui.Card>

                    {/* PROPERTIES */}

                    <Mui.Card className="item-box" initiallyExpanded={true}>
                      <Mui.CardTitle
                        title="Properties"
                        titleColor={Colors.white}
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={{backgroundColor: Colors.lightGreen700}}
                      />

                        <Mui.CardHeader
                          title="Emma Watson"
                          subtitle="Senior Designer"
                          avatar="http://lorempixel.com/100/100/nature/"
                          expandable={true}
                        />

                      <Mui.CardActions expandable={true}>
                        <Mui.RaisedButton
                          label="Assign To..."
                          labelPosition="after"
                          icon={<MuiIcons.ActionFace />}
                        />
                      </Mui.CardActions>
                    </Mui.Card>

                  </Item>
                </Flex>

                </div>
              </Mui.Tab>
              <Mui.Tab label={<span><i className="fa fa-files-o" /> Files</span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab label={<span><i className="fa fa-calendar" /> Planning</span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab label={<span><i className="fa fa-code" /> Dev</span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab label={<span><i className="fa fa-hand-pointer-o" /> Tests</span>}>
                <div>
                  ---
                </div>
              </Mui.Tab>
              <Mui.Tab label={<span><i className="fa fa-archive" /> History</span>}>
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
