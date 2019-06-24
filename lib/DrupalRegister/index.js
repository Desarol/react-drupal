'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formik = require('formik');

var _yup = require('yup');

var Yup = _interopRequireWildcard(_yup);

var _drupalJsonapiClient = require('drupal-jsonapi-client');

var _DrupalAuthenticationProvider = require('../DrupalAuthenticationProvider');

var _DrupalAuthenticationProvider2 = _interopRequireDefault(_DrupalAuthenticationProvider);

var _utils = require('../utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (_ref) {
  var onAuthenticationInit = _ref.onAuthenticationInit,
      onAuthenticationChange = _ref.onAuthenticationChange,
      _ref$expireAfterMinut = _ref.expireAfterMinutes,
      expireAfterMinutes = _ref$expireAfterMinut === undefined ? 60 : _ref$expireAfterMinut,
      _ref$usernameLabel = _ref.usernameLabel,
      usernameLabel = _ref$usernameLabel === undefined ? 'Username' : _ref$usernameLabel,
      _ref$emailLabel = _ref.emailLabel,
      emailLabel = _ref$emailLabel === undefined ? 'Email' : _ref$emailLabel,
      _ref$passwordLabel = _ref.passwordLabel,
      passwordLabel = _ref$passwordLabel === undefined ? 'Password' : _ref$passwordLabel,
      _ref$buttonLabel = _ref.buttonLabel,
      buttonLabel = _ref$buttonLabel === undefined ? 'Register' : _ref$buttonLabel;

  return _react2.default.createElement(
    _DrupalAuthenticationProvider2.default,
    { onChange: onAuthenticationChange, onInit: onAuthenticationInit },
    function (_ref2) {
      var jwt = _ref2.jwt;
      return !jwt ? _react2.default.createElement(
        _formik.Formik,
        {
          initialValues: { email: '', username: '', password: '' },
          onSubmit: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4, _ref5) {
              var email = _ref4.email,
                  username = _ref4.username,
                  password = _ref4.password;
              var setSubmitting = _ref5.setSubmitting,
                  setStatus = _ref5.setStatus;
              var user;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return _drupalJsonapiClient.User.Register(email, username, password);

                    case 3:
                      _context.next = 5;
                      return _drupalJsonapiClient.User.Login(username, password);

                    case 5:
                      user = _context.sent;

                      (0, _utils.saveSession)(user.access_token, _utils.DRUPAL_SESSION_KEY, expireAfterMinutes);
                      setSubmitting(false);
                      _context.next = 14;
                      break;

                    case 10:
                      _context.prev = 10;
                      _context.t0 = _context['catch'](0);

                      try {
                        setStatus(_context.t0.response.data.message);
                      } catch (err) {
                        setStatus('Unexpected error.');
                      }
                      setSubmitting(false);

                    case 14:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined, [[0, 10]]);
            }));

            return function (_x, _x2) {
              return _ref3.apply(this, arguments);
            };
          }(),
          validationSchema: Yup.object().shape({
            email: Yup.string().email().required('Required'),
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required')
          })
        },
        function (props) {
          var values = props.values,
              touched = props.touched,
              errors = props.errors,
              status = props.status,
              isSubmitting = props.isSubmitting,
              handleChange = props.handleChange,
              handleBlur = props.handleBlur,
              handleSubmit = props.handleSubmit;


          return _react2.default.createElement(
            'form',
            { className: 'drupal-register', onSubmit: handleSubmit },
            status && _react2.default.createElement(
              'div',
              { className: 'drupal-register__status' },
              status
            ),
            _react2.default.createElement(
              'div',
              { className: 'drupal-register__field drupal-register__field--email' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'drupal-register-email' },
                emailLabel
              ),
              _react2.default.createElement('input', {
                id: 'drupal-register-email',
                name: 'email',
                type: 'text',
                value: values.email,
                onBlur: handleBlur,
                onChange: handleChange })
            ),
            errors.email && touched.email && _react2.default.createElement(
              'div',
              { className: 'drupal-register__error drupal-register__error--email' },
              errors.email
            ),
            _react2.default.createElement(
              'div',
              { className: 'drupal-register__field drupal-register__field--username' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'drupal-register-username' },
                usernameLabel
              ),
              _react2.default.createElement('input', {
                id: 'drupal-register-username',
                name: 'username',
                type: 'text',
                value: values.username,
                onBlur: handleBlur,
                onChange: handleChange })
            ),
            errors.username && touched.username && _react2.default.createElement(
              'div',
              { className: 'drupal-register__error drupal-register__error--username' },
              errors.username
            ),
            _react2.default.createElement(
              'div',
              { className: 'drupal-register__field drupal-register__field--password' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'drupal-register-password' },
                passwordLabel
              ),
              _react2.default.createElement('input', {
                id: 'drupal-register-password',
                name: 'password',
                type: 'password',
                value: values.password,
                onBlur: handleBlur,
                onChange: handleChange })
            ),
            errors.password && touched.password && _react2.default.createElement(
              'div',
              { className: 'drupal-register__error drupal-register__error--password' },
              errors.password
            ),
            _react2.default.createElement(
              'button',
              {
                className: 'drupal-register__submit',
                type: 'submit',
                disabled: isSubmitting },
              buttonLabel
            )
          );
        }
      ) : null;
    }
  );
};

module.exports = exports['default'];