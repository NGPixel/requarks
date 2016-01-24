"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var faker = require('faker');
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
        var data = [];
        for (var i = 0; i < 10000; i++) {
            data.push({
                RequestId: faker.random.number(),
                RequestTitle: faker.hacker.phrase(),
                RequestStatus: faker.helpers.randomize(['Unconfirmed', 'Under Analysis', 'Queued', 'In Progress', 'Completed', 'Rejected']),
                RequestType: 'Bug - Normal',
                RequestPriority: faker.helpers.randomize(['High', 'Normal', 'Low'])
            });
        }
        ;
        data = _.sortByOrder(data, ['RequestStatus', 'RequestPriority'], ['asc', 'asc']);
        return (React.createElement("div", {className: "content-container"}, React.createElement(Mui.Card, null, React.createElement(Mui.CardHeader, {title: React.createElement(FormattedMessage, {id: "new_request.title"}), subtitle: "Technical", avatar: React.createElement(Mui.Avatar, {icon: React.createElement(MuiIcons.ActionLineWeight, null), backgroundColor: Colors.red500})}), React.createElement("div", {className: "content-datagrid"}, React.createElement(FlexTable, {className: 'list-container', height: 500, headerHeight: 20, rowHeight: 40, rowsCount: data.length, rowGetter: function (index) { return data[index]; }, rowClassName: 'list-row'}, React.createElement(FlexColumn, {label: '#', dataKey: 'RequestId', width: 50, cellClassName: 'list-cell-id'}), React.createElement(FlexColumn, {flexGrow: 1, flexShrink: 0, label: 'Summary', dataKey: 'RequestTitle'}), React.createElement(FlexColumn, {width: 200, label: 'Type', dataKey: 'RequestType'}))), React.createElement(Mui.CardActions, {style: { textAlign: 'right' }}, React.createElement(Mui.FlatButton, {label: React.createElement(FormattedMessage, {id: "review.actions.refresh", defaultMessage: "Refresh"})})))));
    };
    return Review;
}(React.Component));
module.exports = injectIntl(Review);
