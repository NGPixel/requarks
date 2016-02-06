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
        EE.emit('setHeaderUI', {
            navigation: 'dashboard',
            loading: false
        });
    };
    ;
    Dashboard.prototype.componentWillUnmount = function () {
    };
    ;
    Dashboard.prototype.render = function () {
        return (React.createElement("div", {id: "itempage", className: "content-container"}, React.createElement("div", {className: "item-header"}, React.createElement("h1", {className: "item-title"}, React.createElement("span", {className: "item-title-id"}, "#435"), "Grouped services on left-hand side do not appear anywhere on mobile version of the site"), React.createElement(Mui.Tabs, {className: "item-tabs", tabItemContainerStyle: { backgroundColor: 'transparent' }, inkBarStyle: { backgroundColor: Colors.white }}, React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-th-large"}), " General")}, React.createElement("div", {className: "item-tab"}, React.createElement(Flex, {alignItems: "start"}, React.createElement(Item, {flex: 9}, React.createElement(Mui.Paper, {zDepth: 2, style: { backgroundColor: Colors.grey100 }, className: "item-content"}, "=-=-=-")), React.createElement(Item, {flex: 3}, React.createElement(Mui.Card, {className: "item-box", initiallyExpanded: true}, React.createElement(Mui.CardTitle, {title: "Assignee", titleColor: Colors.white, actAsExpander: true, showExpandableButton: true, style: { backgroundColor: Colors.lightBlue700 }}), React.createElement(Mui.CardHeader, {title: "Emma Watson", subtitle: "Senior Designer", avatar: "http://lorempixel.com/100/100/nature/", expandable: true}), React.createElement(Mui.CardActions, {expandable: true}, React.createElement(Mui.RaisedButton, {label: "Assign To...", labelPosition: "after", icon: React.createElement(MuiIcons.ActionFace, null)}))), React.createElement(Mui.Card, {className: "item-box", initiallyExpanded: false}, React.createElement(Mui.CardTitle, {title: "Deadline", titleColor: Colors.white, subtitle: "Tomorrow", subtitleColor: Colors.deepOrange100, actAsExpander: true, showExpandableButton: true, style: { backgroundColor: Colors.deepOrange700 }}), React.createElement(Mui.CardHeader, {title: "Emma Watson", subtitle: "Senior Designer", avatar: "http://lorempixel.com/100/100/nature/", expandable: true}), React.createElement(Mui.CardActions, {expandable: true}, React.createElement(Mui.RaisedButton, {label: "Assign To...", labelPosition: "after", icon: React.createElement(MuiIcons.ActionFace, null)}))), React.createElement(Mui.Card, {className: "item-box", initiallyExpanded: true}, React.createElement(Mui.CardTitle, {title: "Properties", titleColor: Colors.white, actAsExpander: true, showExpandableButton: true, style: { backgroundColor: Colors.lightGreen700 }}), React.createElement(Mui.CardHeader, {title: "Emma Watson", subtitle: "Senior Designer", avatar: "http://lorempixel.com/100/100/nature/", expandable: true}), React.createElement(Mui.CardActions, {expandable: true}, React.createElement(Mui.RaisedButton, {label: "Assign To...", labelPosition: "after", icon: React.createElement(MuiIcons.ActionFace, null)}))))))), React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-files-o"}), " Files")}, React.createElement("div", null, "---")), React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-calendar"}), " Planning")}, React.createElement("div", null, "---")), React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-code"}), " Dev")}, React.createElement("div", null, "---")), React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-hand-pointer-o"}), " Tests")}, React.createElement("div", null, "---")), React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-archive"}), " History")}, React.createElement("div", null, "---"))))));
    };
    return Dashboard;
}(React.Component));
module.exports = injectIntl(Dashboard);
