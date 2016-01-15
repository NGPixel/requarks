"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Team = (function (_super) {
    __extends(Team, _super);
    function Team(props) {
        _super.call(this, props);
    }
    Team.prototype.componentDidMount = function () {
        EE.emit('setHeaderNav', 'team');
    };
    ;
    Team.prototype.componentWillUnmount = function () {
    };
    ;
    Team.prototype.render = function () {
        var categories = _.sortBy(AppStore.data.categories, 'CategoryName').map(function (c) {
            return (React.createElement(Mui.ListItem, {key: c.CategoryId, primaryText: c.CategoryName, leftIcon: React.createElement(MuiIcons.SocialGroup, null)}));
        });
        return (React.createElement("div", {className: "content-container"}, React.createElement(Flex, {alignItems: "start"}, React.createElement(Item, {flex: 2}, React.createElement(Mui.Paper, {zDepth: 2, style: { textAlign: 'left' }}, React.createElement(Mui.List, {subheader: React.createElement(FormattedMessage, {id: "team.title", defaultMessage: "My Teams"})}, categories))), React.createElement(Item, {flex: 10}, "--"))));
    };
    return Team;
}(React.Component));
module.exports = injectIntl(Team);
