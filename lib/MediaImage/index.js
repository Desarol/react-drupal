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

var binaryToBase64 = function binaryToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;

  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
};

var getBinaryContent = function getBinaryContent(file) {
  return new Promise(function (resolve) {
    var fr = new FileReader();
    fr.onload = function (event) {
      resolve(event.target.result);
    };
    fr.readAsArrayBuffer(file);
  });
};

var MediaFormField = function MediaFormField(_ref) {
  var label = _ref.label,
      id = _ref.id,
      src = _ref.src,
      onChange = _ref.onChange;
  return _react2.default.createElement(
    'div',
    { className: 'form__field' },
    _react2.default.createElement(
      'label',
      { className: 'form__label', htmlFor: id },
      label
    ),
    _react2.default.createElement(
      _reactDropzone2.default,
      { multiple: false, onDrop: onChange },
      function (_ref2) {
        var getRootProps = _ref2.getRootProps,
            getInputProps = _ref2.getInputProps;
        return _react2.default.createElement(
          'section',
          { className: 'media-form__field-image-section form__input' },
          _react2.default.createElement(
            'div',
            _extends({}, getRootProps(), { className: 'media-form__dropzone' }),
            _react2.default.createElement('input', _extends({ id: id }, getInputProps())),
            _react2.default.createElement('div', { className: 'media-form__field-image', style: { backgroundImage: 'url(' + src + ')' } }),
            _react2.default.createElement(IconAdd, { className: 'media-form__field-image-icon' })
          )
        );
      }
    )
  );
};

var MediaImage = function MediaImage(props) {
  var id = props.id,
      field = props.field,
      label = props.label,
      nodeType = props.nodeType,
      BASE_URL = props.BASE_URL,
      authorization = props.authorization,
      fileUuid = props.fileUuid,
      onChange = props.onChange;

  var _useState = (0, _react.useState)(null),
      media = _useState[0],
      setMedia = _useState[1];

  var _useState2 = (0, _react.useState)(null),
      localPreview = _useState2[0],
      setLocalPreview = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      remoteMedia = _useState3[0],
      setRemoteMedia = _useState3[1];

  var _useState4 = (0, _react.useState)(false),
      fileChanged = _useState4[0],
      setFileChanged = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      done = _useState5[0],
      setDone = _useState5[1];

  var _useState6 = (0, _react.useState)(false),
      failed = _useState6[0],
      setFailed = _useState6[1];

  if (window.location.host.includes('localhost')) {
    _drupalJsonapiClient.GlobalClient.authorization = 'Basic ' + btoa(authorization);
  } else {
    _drupalJsonapiClient.GlobalClient.sendCookies = true;
  }

  _drupalJsonapiClient.GlobalClient.transport = window.fetch.bind(window);
  _drupalJsonapiClient.GlobalClient.baseUrl = BASE_URL;

  (0, _react.useEffect)(function () {
    _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var file;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(fileUuid && !remoteMedia && !localPreview)) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return _drupalJsonapiClient.Entity.Load('file', 'file', fileUuid);

            case 3:
              file = _context.sent;

              setRemoteMedia(file);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }))();
  });

  var _onSubmit = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(event, field, imageUpload) {
      var drupalResponse;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              event.preventDefault();
              setDone(false);

              _context2.prev = 2;
              _context2.next = 5;
              return _drupalJsonapiClient.File.Upload(imageUpload, imageUpload.name, "node", nodeType, field);

            case 5:
              drupalResponse = _context2.sent;

              onChange(drupalResponse.entityUuid);
              setDone(true);
              setFileChanged(true);
              _context2.next = 11;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 3000);
              });

            case 11:
              setFileChanged(false);
              _context2.next = 19;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2['catch'](2);

              console.log(_context2.t0);
              setDone(true);
              setFailed(true);

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[2, 14]]);
    }));

    return function _onSubmit(_x, _x2, _x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      'form',
      { onSubmit: function onSubmit(e) {
          return _onSubmit(e, field, media);
        }, className: 'media-form' },
      _react2.default.createElement(MediaFormField, {
        label: label,
        id: id,
        src: !!media ? '\'data:' + media.type + ';base64, ' + localPreview + '\'' : '' + BASE_URL + (0, _idx2.default)(remoteMedia, function (_) {
          return _.uri.url;
        }),
        onChange: function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(files) {
            var binary;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return getBinaryContent(files[0]);

                  case 2:
                    binary = _context3.sent;

                    setLocalPreview(binaryToBase64(binary));
                    setMedia(files[0]);
                    setRemoteMedia(null);

                  case 6:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, undefined);
          }));

          return function (_x4) {
            return _ref5.apply(this, arguments);
          };
        }()
      }),
      _react2.default.createElement(
        'div',
        { className: 'form__button-wrapper' },
        remoteMedia == null && done && !fileChanged && _react2.default.createElement('input', {
          className: 'form__button',
          type: 'submit',
          value: 'Upload'
        }),
        !done && !fileChanged && _react2.default.createElement(
          'p',
          null,
          'Uploading...'
        ),
        done && fileChanged ? _react2.default.createElement(
          'div',
          null,
          'Image Uploaded !'
        ) : '',
        failed ? 'Failed to upload image' : ''
      )
    )
  );
};

exports.default = MediaImage;