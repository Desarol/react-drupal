'use strict';

exports.__esModule = true;
exports.IconAdd = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _idx = require('idx');

var _idx2 = _interopRequireDefault(_idx);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _ImagePreview = require('../ImagePreview');

var _ImagePreview2 = _interopRequireDefault(_ImagePreview);

var _drupalJsonapiClient = require('drupal-jsonapi-client');

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var IconAdd = exports.IconAdd = function IconAdd(props) {
  return _react2.default.createElement(
    'svg',
    _extends({}, props, { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' }),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10', className: 'primary' }),
    _react2.default.createElement('path', { fill: '#fff', className: 'secondary', d: 'M13 11h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4z' })
  );
};

var MediaImage = function MediaImage(props) {
  var id = props.id,
      field = props.field,
      label = props.label,
      nodeType = props.nodeType,
      baseURL = props.baseURL,
      authorization = props.authorization,
      fileUUID = props.fileUUID,
      onChange = props.onChange;

  var _useState = (0, _react.useState)([]),
      media = _useState[0],
      setMedia = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      uploading = _useState2[0],
      setUploading = _useState2[1];

  if (window.location.host.includes('localhost')) {
    _drupalJsonapiClient.GlobalClient.authorization = 'Basic ' + btoa(authorization);
  } else {
    _drupalJsonapiClient.GlobalClient.sendCookies = true;
  }

  _drupalJsonapiClient.GlobalClient.transport = window.fetch.bind(window);
  _drupalJsonapiClient.GlobalClient.baseUrl = baseURL;

  (0, _react.useEffect)(function () {
    _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var file;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(fileUUID && !remoteMedia && !localPreview)) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return _drupalJsonapiClient.Entity.Load('file', 'file', fileUUID);

            case 3:
              file = _context.sent;

              setMedia(file);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }))();
  });

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    media.map(function (image) {
      return _react2.default.createElement(_ImagePreview2.default, {
        key: image.localFile.name,
        image: baseURL + image.imageURL
      });
    }),
    _react2.default.createElement('input', {
      accept: 'image/*',
      type: 'file',
      onChange: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(event) {
          var localFile, drupalResponse;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  event.persist();
                  localFile = event.target.files[0];
                  _context2.next = 4;
                  return _drupalJsonapiClient.File.Upload(localFile, localFile.name, "node", nodeType, field);

                case 4:
                  drupalResponse = _context2.sent;


                  setMedia([].concat(media, [{
                    localFile: localFile,
                    imageURL: drupalResponse.uri.url
                  }]));
                  onChange(drupalResponse.entityUuid);

                  if (event.target) event.target.value = null;

                case 8:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }()
    }),
    uploading && 'loading'
  );
};

exports.default = MediaImage;