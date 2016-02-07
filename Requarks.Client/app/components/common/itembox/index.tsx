/// <reference path="../../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface IItemBoxProps extends React.Props<any> {
  accentColor: string;
  title: string;
  icon: string;
  actions: any;
}

class ItemBox extends React.Component<IItemBoxProps, any> {

  constructor(props: IItemBoxProps) {
      super(props);
  }

  render() {

    return(

      <div className="item-box">
        <div className="item-box-header" style={{backgroundColor: this.props.accentColor}}>
          <i className="material-icons">{this.props.icon}</i>
          <span className="item-box-title">{this.props.title}</span>
        </div>
        <div className="item-box-content">
          {this.props.children}
        </div>
        <div className="item-box-actions">
          {this.props.actions}
        </div>
      </div>

    );

  }

}

export = ItemBox;
