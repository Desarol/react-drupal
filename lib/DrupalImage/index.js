'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Pass images:
 * 
 * images = [{
 *    url: '',
 *    name: '',
 *    id: ''
 * }]
 */

var DrupalImagePreview = function DrupalImagePreview(_ref) {
  var url = _ref.url,
      fileName = _ref.fileName,
      _ref$removeText = _ref.removeText,
      removeText = _ref$removeText === undefined ? 'Remove' : _ref$removeText,
      onDelete = _ref.onDelete;
  return _react2.default.createElement(
    'div',
    { className: 'drupal-image__preview' },
    _react2.default.createElement('img', { className: 'drupal-image__preview-image', src: url }),
    _react2.default.createElement(
      'div',
      { className: 'drupal-image__preview-filename' },
      fileName
    ),
    _react2.default.createElement(
      'button',
      {
        className: 'drupal-image__preview-button',
        onClick: onDelete },
      removeText
    )
  );
};

var DrupalImage = function DrupalImage(_ref2) {
  var _ref2$images = _ref2.images,
      images = _ref2$images === undefined ? [] : _ref2$images,
      _ref2$limit = _ref2.limit,
      limit = _ref2$limit === undefined ? 1 : _ref2$limit,
      _ref2$accept = _ref2.accept,
      accept = _ref2$accept === undefined ? 'image/*' : _ref2$accept,
      _ref2$onUpload = _ref2.onUpload,
      onUpload = _ref2$onUpload === undefined ? function () {} : _ref2$onUpload,
      _ref2$onDelete = _ref2.onDelete,
      _onDelete = _ref2$onDelete === undefined ? function () {} : _ref2$onDelete;

  return _react2.default.createElement(
    'div',
    { className: 'drupal-image' },
    images && images.length > 0 && _react2.default.createElement(
      'div',
      { className: 'drupal-image__preview-wrapper' },
      images.map(function (image) {
        return _react2.default.createElement(DrupalImagePreview, {
          key: image.name + image.url,
          fileName: image.name,
          url: image.url,
          onDelete: function onDelete() {
            return _onDelete(image.id);
          } });
      })
    ),
    images.length < limit && _react2.default.createElement(
      'div',
      { className: 'drupal-image__input-wrapper' },
      _react2.default.createElement('input', {
        id: 'drupal-image',
        name: 'drupal-image',
        accept: accept,
        type: 'file',
        onChange: function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    event.persist();
                    onUpload(event.target.files[0]);
                    if (event.target) event.target.value = null;

                  case 3:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function (_x) {
            return _ref3.apply(this, arguments);
          };
        }()
      })
    )
  );
};

exports.default = DrupalImage;
module.exports = exports['default'];