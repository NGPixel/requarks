'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _colors = require('../node_modules/material-ui/lib/styles/colors');

var _colors2 = _interopRequireDefault(_colors);

var _utilsColorManipulator = require('../node_modules/material-ui/lib/utils/color-manipulator');

var _utilsColorManipulator2 = _interopRequireDefault(_utilsColorManipulator);

var _spacing = require('../node_modules/material-ui/lib/styles/spacing');

var _spacing2 = _interopRequireDefault(_spacing);

/*
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

exports['default'] = {
  spacing: _spacing2['default'],
  fontFamily: 'Roboto Condensed, sans-serif',
  zIndex: {
    layer: 20,
    popover: 20
  },
  palette: {
    primary1Color: _colors2['default'].cyan500,
    primary2Color: _colors2['default'].cyan700,
    primary3Color: _colors2['default'].grey400,
    accent1Color: _colors2['default'].red500,
    accent2Color: _colors2['default'].grey100,
    accent3Color: _colors2['default'].grey500,
    textColor: _colors2['default'].darkBlack,
    alternateTextColor: _colors2['default'].white,
    canvasColor: _colors2['default'].white,
    borderColor: _colors2['default'].grey300,
    disabledColor: _utilsColorManipulator2['default'].fade(_colors2['default'].darkBlack, 0.3),
    pickerHeaderColor: _colors2['default'].cyan500,
    clockCircleColor: _utilsColorManipulator2['default'].fade(_colors2['default'].darkBlack, 0.07)
  }
};
module.exports = exports['default'];