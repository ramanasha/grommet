'use strict';

exports.__esModule = true;
exports.withTheme = exports.withFocus = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getDisplayName = require('recompose/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _vanilla = require('../themes/vanilla');

var _vanilla2 = _interopRequireDefault(_vanilla);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withFocus = exports.withFocus = function withFocus(WrappedComponent) {
  var FocusableComponent = function (_Component) {
    _inherits(FocusableComponent, _Component);

    function FocusableComponent() {
      var _temp, _this, _ret;

      _classCallCheck(this, FocusableComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
        mouseActive: false,
        focus: false
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    FocusableComponent.prototype.setMouseActive = function setMouseActive() {
      this.setState({ mouseActive: true });
    };

    FocusableComponent.prototype.resetMouseActive = function resetMouseActive() {
      this.setState({ mouseActive: false });
    };

    FocusableComponent.prototype.setFocus = function setFocus() {
      var mouseActive = this.state.mouseActive;

      if (mouseActive === false) {
        this.setState({ focus: true });
      }
    };

    FocusableComponent.prototype.resetFocus = function resetFocus() {
      this.setState({ focus: false });
    };

    FocusableComponent.prototype.render = function render() {
      var _this2 = this;

      var focus = this.state.focus;

      return _react2.default.createElement(WrappedComponent, _extends({
        focus: focus
      }, this.props, {
        onMouseDown: function onMouseDown(event) {
          _this2.setMouseActive();
          var onMouseDown = _this2.props.onMouseDown;

          if (onMouseDown) {
            onMouseDown(event);
          }
        },
        onMouseUp: function onMouseUp(event) {
          _this2.resetMouseActive();
          var onMouseUp = _this2.props.onMouseUp;

          if (onMouseUp) {
            onMouseUp(event);
          }
        },
        onFocus: function onFocus(event) {
          _this2.setFocus();
          var onFocus = _this2.props.onFocus;

          if (onFocus) {
            onFocus(event);
          }
        },
        onBlur: function onBlur(event) {
          _this2.resetFocus();
          var onBlur = _this2.props.onBlur;

          if (onBlur) {
            onBlur(event);
          }
        }
      }));
    };

    return FocusableComponent;
  }(_react.Component);

  FocusableComponent.displayName = (0, _getDisplayName2.default)(WrappedComponent);

  return FocusableComponent;
};

var withTheme = exports.withTheme = function withTheme(WrappedComponent) {
  var ThemedComponent = function (_Component2) {
    _inherits(ThemedComponent, _Component2);

    function ThemedComponent(props, context) {
      _classCallCheck(this, ThemedComponent);

      var _this3 = _possibleConstructorReturn(this, _Component2.call(this, props, context));

      _initialiseProps.call(_this3);

      _this3.buildTheme(props, context);
      return _this3;
    }

    ThemedComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      // only merge on existence changes
      if (nextProps.theme && !this.props.theme || !nextProps.theme && this.props.theme) {
        this.buildTheme(nextProps, this.context);
      }
    };

    ThemedComponent.prototype.render = function render() {
      var theme = this.state.theme;

      return _react2.default.createElement(WrappedComponent, _extends({}, this.props, { theme: theme }));
    };

    return ThemedComponent;
  }(_react.Component);

  ThemedComponent.contextTypes = {
    theme: _propTypes2.default.object
  };

  var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.buildTheme = function (props, context) {
      var theme = props.theme;
      var contextTheme = context.theme;

      var localTheme = (0, _utils.deepMerge)(_vanilla2.default, contextTheme, theme);
      _this4.state = { theme: localTheme };
    };
  };

  ThemedComponent.displayName = (0, _getDisplayName2.default)(WrappedComponent);

  return ThemedComponent;
};

exports.default = { withFocus: withFocus, withTheme: withTheme };