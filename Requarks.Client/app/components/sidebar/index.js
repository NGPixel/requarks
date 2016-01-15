"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var LeftNav = require('material-ui/lib/left-nav');
var _a = require('material-ui/lib/menu'), Menu = _a.Menu, MenuItem = _a.MenuItem;
var Sidebar = (function (_super) {
    __extends(Sidebar, _super);
    function Sidebar(props) {
        _super.call(this, props);
        this.state = { shown: true, sd: null };
    }
    ;
    Sidebar.prototype.componentDidMount = function () {
    };
    ;
    Sidebar.prototype.componentWillUnmount = function () {
    };
    ;
    Sidebar.prototype.render = function () {
        var _this = this;
        return (React.createElement(LeftNav, {ref: function (c) { return _this.state.sd = c; }, docked: false, openRight: true}));
    };
    ;
    return Sidebar;
})(React.Component);
exports.Sidebar = Sidebar;
