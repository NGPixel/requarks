"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Review = (function (_super) {
    __extends(Review, _super);
    function Review(props) {
        _super.call(this, props);
    }
    Review.prototype.componentDidMount = function () {
        EE.emit('setHeaderNav', 'review');
    };
    ;
    Review.prototype.componentWillUnmount = function () {
    };
    ;
    Review.prototype.formatDate = function (d) {
        return moment(d).format('YYYY/MM/DD');
    };
    Review.prototype.render = function () {
        var data = [
            { id: '1', firstName: 'John', lastName: 'Bobson' },
            { id: '2', firstName: 'Bob', lastName: 'Mclaren' }
        ];
        var columns = [
            { name: 'firstName' },
            { name: 'lastName' }
        ];
        return (React.createElement(Flex, {alignItems: "start", className: "content-container"}, React.createElement(Item, {flex: 3}, React.createElement(Mui.Paper, {zDepth: 2, style: { textAlign: 'left' }}, React.createElement(Mui.List, {subheader: React.createElement(FormattedMessage, {id: "new_request.category"})}, React.createElement(Mui.ListItem, {primaryText: "Content", leftIcon: React.createElement(MuiIcons.ActionReceipt, {color: Colors.cyan500})}), React.createElement(Mui.ListItem, {primaryText: "Graphic Design", leftIcon: React.createElement(MuiIcons.ContentGesture, {color: Colors.green500})}), React.createElement(Mui.ListItem, {primaryText: "Technical", leftIcon: React.createElement(MuiIcons.HardwareMemory, null), rightIcon: React.createElement(MuiIcons.NavigationCheck, {color: Colors.red500})}), React.createElement(Mui.ListItem, {primaryText: "Templates", leftIcon: React.createElement(MuiIcons.ContentSelectAll, {color: Colors.purple500})})))), React.createElement(Item, {flex: 9}, React.createElement(Mui.Card, null, React.createElement(Mui.CardHeader, {title: React.createElement(FormattedMessage, {id: "new_request.title"}), subtitle: "Technical", avatar: React.createElement(Mui.Avatar, {icon: React.createElement(MuiIcons.ActionLineWeight, null), backgroundColor: Colors.red500})}), React.createElement("div", {className: "content-datagrid"}, React.createElement(DataGrid, {idProperty: "id", dataSource: data, columns: columns})), React.createElement(Mui.CardActions, {style: { textAlign: 'right' }}, React.createElement(Mui.FlatButton, {label: React.createElement(FormattedMessage, {id: "review.actions.refresh", defaultMessage: "Refresh"})}))))));
    };
    return Review;
}(React.Component));
module.exports = injectIntl(Review);
