"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ItemBox = (function (_super) {
    __extends(ItemBox, _super);
    function ItemBox(props) {
        _super.call(this, props);
    }
    ItemBox.prototype.render = function () {
        return (React.createElement("div", {className: "item-box"}, React.createElement("div", {className: "item-box-header", style: { backgroundColor: this.props.accentColor }}, React.createElement("i", {className: "material-icons"}, this.props.icon), React.createElement("span", {className: "item-box-title"}, this.props.title)), React.createElement("div", {className: "item-box-content"}, this.props.children), React.createElement("div", {className: "item-box-actions"}, this.props.actions)));
    };
    return ItemBox;
}(React.Component));
module.exports = ItemBox;
