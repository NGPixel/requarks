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
                for (var i = 0; i < 100; i++) {
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
                tmpData = _.orderBy(tmpData, ['RequestStatus', 'RequestPriority'], ['asc', 'asc']);
                return tmpData;
            })()
        };
    }
    Review.prototype.componentDidMount = function () {
        EE.emit('setHeaderUI', {
            navigation: 'review',
            loading: false
        });
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
        return (React.createElement("div", {className: "content-container"}, React.createElement(Mui.Card, {style: { backgroundColor: Colors.grey100 }}, React.createElement(Flex, {className: "list-filters"}, React.createElement(Item, {flex: 4}, React.createElement(Mui.FlatButton, {label: "Technical", labelPosition: "after", onClick: this.changeCategory}, React.createElement(Mui.FontIcon, {className: "material-icons"}, "memory")), React.createElement(Mui.LeftNav, {docked: false, open: this.state.open, onRequestChange: function (open) { return _this.setState({ open: open }); }}, React.createElement(Mui.MenuItem, {primaryText: "Categories", disabled: true}), AppStore.data.categories.map(function (c) {
            return (React.createElement(Mui.MenuItem, {value: c.CategoryId, key: c.CategoryId, primaryText: c.CategoryName, leftIcon: React.createElement(Mui.FontIcon, {className: "material-icons", color: Colors[c.CategoryColor]}, c.CategoryIcon)}));
        }))), React.createElement(Item, {flex: 8})), React.createElement("div", {className: "content-datagrid", style: { borderBottom: '1px solid ' + Colors.grey300 }}, React.createElement(FlexTable, {className: 'list-container', height: 800, headerHeight: 30, rowHeight: 30, rowsCount: this.state.data.length, rowGetter: function (index) { return _this.state.data[index]; }, rowClassName: function (index) {
            if (index < 0) {
                return 'list-header';
            }
            return 'list-row' + ((index % 2 == 0) ? ' odd' : '');
        }}, React.createElement(FlexColumn, {label: '', dataKey: 'RequestId', width: 50, cellClassName: 'list-cell-id', headerClassName: 'list-header-id'}), React.createElement(FlexColumn, {width: 30, label: '', dataKey: 'RequestStatus', cellClassName: 'list-cell-status', cellRenderer: function (cellData, cellDataKey, rowData, rowIndex, columnData) {
            return React.createElement("div", {className: 'status-blue'}, React.createElement("i", {className: "material-icons"}, "label"));
        }}), React.createElement(FlexColumn, {flexGrow: 1, flexShrink: 0, label: 'Summary', dataKey: 'RequestTitle', cellClassName: 'list-cell-title', cellRenderer: function (cellData, cellDataKey, rowData, rowIndex, columnData) {
            return React.createElement("div", null, React.createElement("ul", {className: "list-tags"}, React.createElement("li", null, rowData.RequestPriority), React.createElement("li", null, rowData.RequestType)), React.createElement("ul", {className: "list-meta"}, (_.random(5) == 1) ? React.createElement("li", null, React.createElement("i", {className: "li_star"})) : '', (_.random(3) == 1) ? React.createElement("li", null, React.createElement("i", {className: "li_clip"})) : '', (_.random(5) > 1) ? React.createElement("li", null, React.createElement("i", {className: "li_bubble"}), " ", _.random(25)) : ''), React.createElement("span", null, cellData));
        }}), React.createElement(FlexColumn, {width: 70, label: 'Priority', dataKey: 'RequestPriority', cellClassName: 'list-cell-priority', cellRenderer: function (cellData, cellDataKey, rowData, rowIndex, columnData) {
            var prColor = 'grey';
            var prIntensity = 0;
            switch (cellData) {
                case 'High':
                    prColor = 'red';
                    prIntensity = 3;
                    break;
                case 'Normal':
                    prColor = 'orange';
                    prIntensity = 2;
                    break;
                case 'Low':
                    prColor = 'brown';
                    prIntensity = 1;
                    break;
            }
            return React.createElement("span", {className: 'list-badge list-badge-' + prColor}, _.times(prIntensity, function () {
                return React.createElement("i", {className: "fa fa-circle"});
            }), _.times(3 - prIntensity, function () {
                return React.createElement("i", {className: "fa fa-circle-o"});
            }));
        }}), React.createElement(FlexColumn, {width: 30, label: '', dataKey: 'RequestImageUrl', cellClassName: 'list-cell-avatar', cellRenderer: function (cellData, cellDataKey, rowData, rowIndex, columnData) {
            return React.createElement("img", {src: cellData, alt: ""});
        }}))), React.createElement(Mui.CardActions, {style: { textAlign: 'right' }}, React.createElement(Mui.FlatButton, {label: React.createElement(FormattedMessage, {id: "review.actions.refresh", defaultMessage: "Refresh"})})))));
    };
    return Review;
}(React.Component));
module.exports = injectIntl(Review);
