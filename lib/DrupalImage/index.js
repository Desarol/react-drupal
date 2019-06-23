'use strict';

exports.__esModule = true;
exports.IconAdd = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DrupalImagePreview = require('./DrupalImagePreview');

var _DrupalImagePreview2 = _interopRequireDefault(_DrupalImagePreview);

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

var DrupalImage = function DrupalImage(props) {
  var id = props.id,
      limit = props.limit,
      field = props.field,
      label = props.label,
      nodeType = props.nodeType,
      baseURL = props.baseURL,
      authorization = props.authorization,
      fileUUIDs = props.fileUUIDs,
      onChange = props.onChange,
      sendCookies = props.sendCookies;

  var _useState = (0, _react.useState)([]),
      media = _useState[0],
      setMedia = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      uploading = _useState2[0],
      setUploading = _useState2[1];

  _drupalJsonapiClient.GlobalClient.authorization = authorization ? authorization : null;
  _drupalJsonapiClient.GlobalClient.sendCookies = sendCookies;
  _drupalJsonapiClient.GlobalClient.baseUrl = baseURL;

  (0, _react.useEffect)(function () {
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var files;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(fileUUIDs.length !== 0 && media.length === 0)) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return _drupalJsonapiClient.Entity.LoadMultiple({
                entityType: 'file',
                entityBundle: 'file',
                filter: new _drupalJsonapiClient.Filter({
                  identifier: 'ids',
                  path: 'id',
                  operator: 'IN',
                  value: fileUUIDs
                })
              });

            case 3:
              files = _context.sent;

              setMedia([].concat(media, files.map(function (file) {
                return {
                  name: file.filename,
                  imageURL: file.uri.url,
                  drupalUUID: file.entityUuid
                };
              })));

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
      return _react2.default.createElement(_DrupalImagePreview2.default, {
        key: image.name,
        name: image.name,
        image: baseURL + image.imageURL,
        deleteImage: function deleteImage() {
          _drupalJsonapiClient.File.Delete(image.drupalUUID);
          var newMedia = media.filter(function (item) {
            return item.drupalUUID != image.drupalUUID;
          });
          onChange(newMedia.map(function (item) {
            return item.drupalUUID;
          }));
          setMedia(newMedia);
        }
      });
    }),
    media.length < limit && _react2.default.createElement(
      'div',
      { className: 'media-image__wrapper' },
      label && _react2.default.createElement(
        'label',
        { htmlFor: 'media-image' },
        label
      ),
      _react2.default.createElement(
        'div',
        { className: 'media-image__box' },
        _react2.default.createElement('input', {
          id: 'media-image',
          accept: 'image/*',
          type: 'file',
          onChange: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
              var localFile, drupalResponse, newMedia;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      event.persist();
                      setUploading(true);
                      localFile = event.target.files[0];
                      _context2.next = 5;
                      return _drupalJsonapiClient.File.Upload(localFile, localFile.name, entityType, entityBundle, field);

                    case 5:
                      drupalResponse = _context2.sent;
                      newMedia = [].concat(media, [{
                        name: localFile.name,
                        imageURL: drupalResponse.uri.url,
                        drupalUUID: drupalResponse.entityUuid
                      }]);

                      setMedia(newMedia);
                      onChange(newMedia.map(function (item) {
                        return item.drupalUUID;
                      }));
                      setUploading(false);

                      if (event.target) event.target.value = null;

                    case 11:
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
        })
      ),
      uploading && 'uploading...'
    )
  );
};

exports.default = DrupalImage;