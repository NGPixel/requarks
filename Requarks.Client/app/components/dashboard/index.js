"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Dashboard = (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard(props) {
        _super.call(this, props);
    }
    Dashboard.prototype.componentDidMount = function () {
        EE.emit('setHeaderNav', 'dashboard');
    };
    ;
    Dashboard.prototype.componentWillUnmount = function () {
    };
    ;
    Dashboard.prototype.render = function () {
        return (React.createElement(Flex, {alignItems: "start", id: "dashboard"}, React.createElement(Item, {flex: 12}, "---")));
    };
    return Dashboard;
}(React.Component));
module.exports = injectIntl(Dashboard);
