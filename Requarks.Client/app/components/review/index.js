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
        var _this = this;
        _super.call(this, props);
        this.changeCategory = function () {
            _this.setState({ open: !_this.state.open });
        };
        this.state = {
            open: false,
            data: (function () {
                var tmpData = [];
                for (var i = 0; i < 10000; i++) {
                    tmpData.push({
                        RequestId: faker.random.number(),
                        RequestTitle: faker.hacker.phrase(),
                        RequestStatus: faker.helpers.randomize(['Unconfirmed', 'Under Analysis', 'Queued', 'In Progress', 'Completed', 'Rejected']),
                        RequestType: faker.helpers.randomize(['Bug - Urgent', 'Bug - Normal', 'Bug - Minor', 'Enhancement', 'New Feature']),
                        RequestPriority: faker.helpers.randomize(['High', 'Normal', 'Low']),
                        RequestImageUrl: faker.image.avatar()
                    });
                }
                ;
                tmpData = _.sortByOrder(tmpData, ['RequestStatus', 'RequestPriority'], ['asc', 'asc']);
                return tmpData;
            })()
        };
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
        var _this = this;
        return (React.createElement("div", {className: "content-container"}, React.createElement(Mui.Card, {style: { backgroundColor: Colors.lightBlue700 }}, React.createElement(Flex, {className: "list-filters"}, React.createElement(Item, {flex: 4}, React.createElement(Mui.FlatButton, {label: "Technical", labelPosition: "after", onClick: this.changeCategory}, React.createElement(Mui.FontIcon, {className: "material-icons"}, "memory")), React.createElement(Mui.LeftNav, {docked: false, open: this.state.open, onRequestChange: function (open) { return _this.setState({ open: open }); }}, React.createElement(Mui.MenuItem, {primaryText: "Categories", disabled: true}), AppStore.data.categories.map(function (c) {
            return (React.createElement(Mui.MenuItem, {value: c.CategoryId, key: c.CategoryId, primaryText: c.CategoryName, leftIcon: React.createElement(Mui.FontIcon, {className: "material-icons", color: Colors[c.CategoryColor]}, c.CategoryIcon)}));
        }))), React.createElement(Item, {flex: 8})), React.createElement("div", {className: "content-datagrid"}, React.createElement(FlexTable, {className: 'list-container', height: 800, headerHeight: 30, rowHeight: 40, rowsCount: this.state.data.length, rowGetter: function (index) { return _this.state.data[index]; }, rowClassName: function (index) {
            if (index < 0) {
                return 'list-header';
            }
            return 'list-row' + ((index % 2 == 0) ? ' odd' : '');
        }}, React.createElement(FlexColumn, {label: '', dataKey: 'RequestId', width: 50, cellClassName: 'list-cell-id', headerClassName: 'list-header-id'}), React.createElement(FlexColumn, {flexGrow: 1, flexShrink: 0, label: 'Summary', dataKey: 'RequestTitle', cellRenderer: function (cellData, cellDataKey, rowData, rowIndex, columnData) {
            return React.createElement(Mui.Ripples.TouchRipple, {color: Colors.lightBlue800}, cellData);
        }}), React.createElement(FlexColumn, {width: 125, label: 'Status', dataKey: 'RequestStatus', cellClassName: 'list-cell-status'}), React.createElement(FlexColumn, {width: 125, label: 'Type', dataKey: 'RequestType', cellClassName: 'list-cell-type'}), React.createElement(FlexColumn, {width: 80, label: 'Priority', dataKey: 'RequestPriority', cellClassName: 'list-cell-priority'}), React.createElement(FlexColumn, {width: 40, label: '', dataKey: 'RequestImageUrl', cellClassName: 'list-cell-avatar', cellRenderer: function (cellData, cellDataKey, rowData, rowIndex, columnData) {
            return React.createElement("img", {src: cellData, alt: ""});
        }}))), React.createElement(Mui.CardActions, {style: { textAlign: 'right' }}, React.createElement(Mui.FlatButton, {label: React.createElement(FormattedMessage, {id: "review.actions.refresh", defaultMessage: "Refresh"})})))));
    };
    return Review;
}(React.Component));
module.exports = injectIntl(Review);
