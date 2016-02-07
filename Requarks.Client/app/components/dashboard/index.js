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
        var d = new Date("October 13, 2014 11:13:00");
        return (React.createElement("div", {id: "itempage", className: "content-container"}, React.createElement("div", {className: "item-header"}, React.createElement("h1", {className: "item-title"}, React.createElement("span", {className: "item-title-id"}, "#435"), React.createElement("span", {className: "item-title-text"}, "Grouped services on left-hand side do not appear anywhere on mobile version of the site"), React.createElement("span", {className: "item-title-subtext"}, React.createElement(FormattedMessage, {id: "itempage.submitted_on", values: { submitDate: d }}))), React.createElement(Mui.Tabs, {className: "item-tabs", tabItemContainerStyle: { backgroundColor: 'transparent' }, inkBarStyle: { backgroundColor: Colors.white }}, React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-th-large"}), " ", React.createElement(FormattedMessage, {id: "itempage.general"}))}, React.createElement("div", {className: "item-tab"}, React.createElement(Flex, {alignItems: "start"}, React.createElement(Item, {flex: 9}, React.createElement(Mui.Paper, {zDepth: 2, style: { backgroundColor: Colors.grey100, padding: 15 }, className: "item-content"}, "[description here]")), React.createElement(Item, {flex: 3}, React.createElement(Common.ItemBox, {accentColor: Colors.lightBlue700, title: "Assignee", icon: "face", actions: React.createElement(Mui.RaisedButton, {label: "Assign To...", labelPosition: "after", icon: React.createElement(MuiIcons.ActionFace, null)})}, React.createElement(Mui.CardHeader, {title: "Emma Watson", subtitle: "Senior Designer", avatar: "http://lorempixel.com/100/100/nature/", expandable: true})), React.createElement(Common.ItemBox, {accentColor: Colors.deepOrange700, title: "Deadline", icon: "insert_invitation", actions: React.createElement("div", null, React.createElement(Mui.RaisedButton, {label: "Confirm", labelPosition: "after", icon: React.createElement(MuiIcons.ActionDone, null)}), React.createElement(Mui.RaisedButton, {label: "Set...", labelPosition: "after", icon: React.createElement(MuiIcons.HardwareKeyboardTab, null)}))}, React.createElement(Mui.CardHeader, {title: "Emma Watson", subtitle: "Senior Designer", avatar: "http://lorempixel.com/100/100/nature/", expandable: true})), React.createElement(Common.ItemBox, {accentColor: Colors.lightGreen700, title: "Project", icon: "view_carousel", actions: React.createElement(Mui.RaisedButton, {label: "Set Project...", labelPosition: "after", icon: React.createElement(MuiIcons.ActionViewCarousel, null)})}, React.createElement(Mui.CardHeader, {title: "Emma Watson", subtitle: "Senior Designer", avatar: "http://lorempixel.com/100/100/nature/", expandable: true})))))), React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-files-o"}), "  ", React.createElement(FormattedMessage, {id: "itempage.files"}))}, React.createElement("div", null, "---")), React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-calendar"}), "  ", React.createElement(FormattedMessage, {id: "itempage.planning"}))}, React.createElement("div", null, "---")), React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-code"}), "  ", React.createElement(FormattedMessage, {id: "itempage.dev"}))}, React.createElement("div", null, "---")), React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-hand-pointer-o"}), "  ", React.createElement(FormattedMessage, {id: "itempage.tests"}))}, React.createElement("div", null, "---")), React.createElement(Mui.Tab, {label: React.createElement("span", null, React.createElement("i", {className: "fa fa-archive"}), "  ", React.createElement(FormattedMessage, {id: "itempage.history"}))}, React.createElement("div", null, "---"))))));
    };
    return Dashboard;
}(React.Component));
module.exports = injectIntl(Dashboard);
