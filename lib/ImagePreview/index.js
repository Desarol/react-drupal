'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImagePreview = function ImagePreview(props) {
  var image = props.image,
      name = props.name,
      deleteImage = props.deleteImage;


  return _react2.default.createElement(
    'div',
    { className: 'image-preview' },
    _react2.default.createElement(
      'div',
      { className: 'image-preview__image-wrapper' },
      _react2.default.createElement('img', { className: 'image-preview__image', src: image }),
      _react2.default.createElement(
        'div',
        null,
        name
      )
    ),
    _react2.default.createElement(
      'button',
      { onClick: deleteImage, className: 'image-preview__button' },
      'Remove'
    )
  );
};

exports.default = ImagePreview;
module.exports = exports['default'];