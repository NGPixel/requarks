/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

const LeftNav = require('material-ui/lib/left-nav');
let { Menu, MenuItem } = require('material-ui/lib/menu');

interface ISidebarProps extends React.Props<any> {

}

interface ISidebarState extends React.Props<any> {
    shown: Boolean;
    sd: any;
}

export class Sidebar extends React.Component<ISidebarProps, ISidebarState> {

  unsubscribe: any;

  constructor(props: ISidebarProps) {
      super(props);
      this.state = { shown: true, sd: null };
  };

  componentDidMount() {

  };

  componentWillUnmount() {

  };

  render() {

    return (
      <LeftNav ref={(c) => this.state.sd = c} docked={false} openRight={true} />
    );

  };

}
