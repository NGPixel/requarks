/// <reference path="../../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface ILogoAnimProps extends React.Props<any> {}

class LogoAnim extends React.Component<ILogoAnimProps, any> {

  constructor(props: ILogoAnimProps) {
      super(props);
  }

  render() {

    return(

      <svg className="logo-anim" version="1.1" id="Design" x="0px" y="0px" viewBox="0 0 192 192" style={{width: 200, height: 200}}>
        <path className="st0" d="M160,95.9V32.3c0-6.8-5.5-12.4-12.4-12.4H44.4c-6.8,0-12.4,5.5-12.4,12.4v63.6H160z" />
        <path className="st1" d="M44.4,20.9h103.3c6.6,0,12,5.1,12.3,11.6v-0.2c0-6.8-5.5-12.4-12.4-12.4H44.4c-6.8,0-12.4,5.5-12.4,12.4v0.8C32,26.3,37.5,20.9,44.4,20.9z"/>
        <path className="st2" d="M32,96v63.6c0,6.8,5.5,12.4,12.4,12.4h103.2c6.8,0,12.4-5.5,12.4-12.4V96H32z"/>
        <path className="st1" d="M147.6,171H44.3c-6.6,0-12-5.1-12.3-11.6v0.2c0,6.8,5.5,12.4,12.4,12.4h103.2c6.8,0,12.4-5.5,12.4-12.4v-0.8C160,165.5,154.5,171,147.6,171z"/>
        <path className="st2" d="M164,96l8-51.6c0-6.8-5.5-12.4-12.4-12.4H32.4C25.5,32,20,37.5,20,44.4L28,96H164z"/>
        <path className="st1" d="M32.4,32.9h127.2c6.6,0,12,5.2,12.3,11.7l0-0.2c0-6.8-5.5-12.4-12.4-12.4H32.4C25.5,32,20,37.5,20,44.4l0,0.2C20.4,38.1,25.8,32.9,32.4,32.9z"/>
        <g>
          <path className="st0" d="M28,95.9l-8,51.6c0,6.8,5.5,12.4,12.4,12.4h127.2c6.8,0,12.4-5.5,12.4-12.4l-8-51.6H28z"/>
          <path className="st3" d="M159.6,159H32.4c-6.6,0-12-5.2-12.3-11.7l0,0.2c0,6.8,5.5,12.4,12.4,12.4h127.2c6.8,0,12.4-5.5,12.4-12.4l0-0.2C171.6,153.8,166.2,159,159.6,159z"/>
        </g>
        <path className="st4" d="M39.9,84l30.5,30.5l5.5,17.5l27.6,27.6h58.8c5.6-1.2,9.7-6.2,9.7-12.1l-8-51.6l3.3-20.5L156,64.3L39.9,84z"/>
        <g>
          <polygon className="st5" points="39.9,84 156,64.3 115.9,124 96.1,113.7 75.9,132 62.6,96.1"/>
          <polygon className="st6" points="62.6,96.1 156,64.3 76,103.3 96.1,113.7 75.9,132"/>
          <polygon className="st7" points="76,103.1 75.9,132 96.1,113.7"/>
        </g>
      </svg>

    );

  }

}

export = LogoAnim;
