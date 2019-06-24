'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('react-dates/initialize');

require('react-dates/lib/css/_datepicker.css');

var _reactDates = require('react-dates');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component DrupalDatePicker.
 * 
 * Exports a component which can be used to manipulate a "datetime" field on a
 * Drupal entity. This doesn't let you set a time.
 */
exports.default = function (_ref) {
  var id = _ref.id,
      date = _ref.date,
      onChange = _ref.onChange;

  var _useState = (0, _react.useState)(),
      stateDate = _useState[0],
      setDate = _useState[1];

  var _useState2 = (0, _react.useState)(),
      focused = _useState2[0],
      setFocused = _useState2[1];

  (0, _react.useEffect)(function () {
    setDate((0, _moment2.default)(date));
  }, [date]);

  return _react2.default.createElement(_reactDates.SingleDatePicker, {
    id: id,
    date: stateDate,
    focused: focused,
    onDateChange: function onDateChange(newDate) {
      onChange(newDate.format('YYYY-MM-DD'));
      setDate(stateDate);
    },
    onFocusChange: function onFocusChange(_ref2) {
      var focused = _ref2.focused;
      return setFocused(focused);
    }
  });
};

module.exports = exports['default'];