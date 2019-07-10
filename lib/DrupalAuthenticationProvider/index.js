'use strict';

exports.__esModule = true;

var _react = require('react');

var _utils = require('../utils');

var DrupalAuthenticationProvider = function DrupalAuthenticationProvider(_ref) {
  var children = _ref.children,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === undefined ? function () {} : _ref$onChange,
      _ref$onInit = _ref.onInit,
      onInit = _ref$onInit === undefined ? function () {} : _ref$onInit,
      _ref$sessionStorageKe = _ref.sessionStorageKey,
      sessionStorageKey = _ref$sessionStorageKe === undefined ? _utils.DRUPAL_SESSION_KEY : _ref$sessionStorageKe;

  var _useState = (0, _react.useState)((0, _utils.getSession)(sessionStorageKey)),
      session = _useState[0],
      setSession = _useState[1];

  (0, _react.useEffect)(function () {
    onInit(session);
  }, [onInit]);

  var checkForSessionStorageData = function checkForSessionStorageData() {
    var nextSession = (0, _utils.getSession)(sessionStorageKey);
    if (session !== nextSession) {
      setSession(nextSession);
      onChange(nextSession);
    }
  };

  (0, _react.useEffect)(function () {
    window.addEventListener('storage', checkForSessionStorageData);

    return function () {
      window.removeEventListener('storage', checkForSessionStorageData);
    };
  });

  return typeof children === 'function' ? children(session) : null;
};

exports.default = DrupalAuthenticationProvider;
module.exports = exports['default'];