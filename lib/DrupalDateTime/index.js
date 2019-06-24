'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component DrupalDateTime.
 * 
 * Exports a component which can be used to manipulate a "datetime" field on a
 * Drupal entity. This is more appropriate when you need to set a time as well as date.
 */
exports.default = function (_ref) {
  var date = _ref.date,
      _onChange = _ref.onChange,
      _ref$includeTime = _ref.includeTime,
      includeTime = _ref$includeTime === undefined ? true : _ref$includeTime;

  var format = includeTime ? 'YYYY-MM-DDTHH:mmZZ' : 'YYYY-MM-DD';
  var dateMoment = typeof date === 'string' ? (0, _moment2.default)(date) : (0, _moment2.default)();

  var _useState = (0, _react.useState)(dateMoment.format('HH:ss')),
      stateTime = _useState[0],
      setTime = _useState[1];

  var _useState2 = (0, _react.useState)(dateMoment.format('YYYY-MM-DD')),
      stateDate = _useState2[0],
      setDate = _useState2[1];

  (0, _react.useEffect)(function () {
    setDate(dateMoment.format('YYYY-MM-DD'));
    setTime(dateMoment.format('HH:mm'));
  }, [date]);

  return _react2.default.createElement(
    'div',
    { className: 'drupal-datetime' },
    _react2.default.createElement('input', {
      type: 'date',
      value: stateDate,
      onChange: function onChange(e) {
        e.persist();
        var nextDate = e.target.value;
        _onChange((0, _moment2.default)(nextDate + 'T' + stateTime).format(format));
        setDate(nextDate);
      } }),
    includeTime && _react2.default.createElement('input', {
      type: 'time',
      value: stateTime,
      onChange: function onChange(e) {
        e.persist();
        var nextTime = e.target.value;
        _onChange((0, _moment2.default)(stateDate + 'T' + nextTime).format(format));
        setTime(nextTime);
      } })
  );
};

module.exports = exports['default'];