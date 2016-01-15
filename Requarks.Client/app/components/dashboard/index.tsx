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
    EE.emit('setHeaderNav', 'dashboard');
  };

  componentWillUnmount() {

  };

  render() {

      return (

          <Flex alignItems="start" id="dashboard">
              <Item flex={12}>
                  ---
              </Item>
          </Flex>

      );
  }

}

export = injectIntl(Dashboard);
