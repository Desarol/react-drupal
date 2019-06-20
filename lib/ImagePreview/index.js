'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImagePreview = function ImagePreview(props) {
  var image = props.image;


  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('img', { src: image })
  );
};

exports.default = ImagePreview;
module.exports = exports['default'];