/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface ILoaderProps extends React.Props<any> {}

class Loader extends React.Component<ILoaderProps, any> {

    constructor(props) {
        super(props);
        this.state = { shown: true };
    }

    render() {

        return (this.state.shown) ? (
            <div id="loader"></div>
        ) : null;
    }

    load() {
        this.setState({ shown: true });
    }

    unload() {
        this.setState({ shown: false });
    }

}

export = injectIntl(Loader);
