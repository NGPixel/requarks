"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Projects = (function (_super) {
    __extends(Projects, _super);
    function Projects(props) {
        _super.call(this, props);
    }
    Projects.prototype.componentDidMount = function () {
        EE.emit('setHeaderNav', 'projects');
    };
    ;
    Projects.prototype.componentWillUnmount = function () {
    };
    ;
    Projects.prototype.render = function () {
        return (React.createElement(Flex, {alignItems: "start"}, React.createElement(Item, {flex: 12}, "---")));
    };
    return Projects;
}(React.Component));
module.exports = injectIntl(Projects);
