"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Loader = (function (_super) {
    __extends(Loader, _super);
    function Loader(props) {
        _super.call(this, props);
        this.state = { shown: true };
    }
    Loader.prototype.render = function () {
        return (this.state.shown) ? (React.createElement("div", {id: "loader"})) : null;
    };
    Loader.prototype.load = function () {
        this.setState({ shown: true });
    };
    Loader.prototype.unload = function () {
        this.setState({ shown: false });
    };
    return Loader;
}(React.Component));
module.exports = injectIntl(Loader);
