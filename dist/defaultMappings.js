"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultMappings = {
  string: function string(_ref) {
    var name = _ref.name,
        key = _ref.key,
        onChange = _ref.onChange,
        onBlur = _ref.onBlur,
        setFieldValue = _ref.setFieldValue,
        additionalProps = _objectWithoutProperties(_ref, ["name", "key", "onChange", "onBlur", "setFieldValue"]);

    return _react.default.createElement("input", _extends({
      name: name,
      key: key,
      onChange: onChange,
      onBlur: onBlur
    }, additionalProps));
  },
  number: function number(_ref2) {
    var name = _ref2.name,
        key = _ref2.key,
        onChange = _ref2.onChange,
        onBlur = _ref2.onBlur,
        setFieldValue = _ref2.setFieldValue,
        additionalProps = _objectWithoutProperties(_ref2, ["name", "key", "onChange", "onBlur", "setFieldValue"]);

    return _react.default.createElement("input", _extends({
      name: name,
      key: key,
      onChange: onChange,
      onBlur: onBlur
    }, additionalProps, {
      type: "number"
    }));
  },
  boolean: function boolean(_ref3) {
    var name = _ref3.name,
        key = _ref3.key,
        onChange = _ref3.onChange,
        onBlur = _ref3.onBlur,
        setFieldValue = _ref3.setFieldValue,
        additionalProps = _objectWithoutProperties(_ref3, ["name", "key", "onChange", "onBlur", "setFieldValue"]);

    return _react.default.createElement("input", _extends({
      name: name,
      key: key,
      onChange: onChange,
      onBlur: onBlur
    }, additionalProps, {
      type: "checkbox"
    }));
  },
  select: function select(_ref4) {
    var name = _ref4.name,
        key = _ref4.key,
        options = _ref4.options,
        onChange = _ref4.onChange,
        onBlur = _ref4.onBlur,
        setFieldValue = _ref4.setFieldValue,
        additionalProps = _objectWithoutProperties(_ref4, ["name", "key", "options", "onChange", "onBlur", "setFieldValue"]);

    return _react.default.createElement("select", _extends({
      name: name,
      key: key,
      onChange: onChange,
      onBlur: onBlur
    }, additionalProps), options.map(function (_ref5) {
      var value = _ref5.value,
          text = _ref5.text,
          optionProps = _objectWithoutProperties(_ref5, ["value", "text"]);

      return _react.default.createElement("option", _extends({
        key: "".concat(value).concat(text),
        value: value
      }, optionProps), text || value);
    }));
  },
  password: function password(_ref6) {
    var name = _ref6.name,
        key = _ref6.key,
        onChange = _ref6.onChange,
        onBlur = _ref6.onBlur,
        setFieldValue = _ref6.setFieldValue,
        additionalProps = _objectWithoutProperties(_ref6, ["name", "key", "onChange", "onBlur", "setFieldValue"]);

    return _react.default.createElement("input", _extends({
      name: name,
      key: key,
      onChange: onChange,
      onBlur: onBlur
    }, additionalProps, {
      type: "password"
    }));
  },
  submit: function submit(_ref7) {
    var _ref7$text = _ref7.text,
        text = _ref7$text === void 0 ? 'Submit' : _ref7$text,
        key = _ref7.key;
    return _react.default.createElement("button", {
      key: key,
      type: "submit"
    }, text);
  },
  default: function _default(_ref8) {
    var name = _ref8.name,
        key = _ref8.key,
        onChange = _ref8.onChange,
        onBlur = _ref8.onBlur,
        setFieldValue = _ref8.setFieldValue,
        additionalProps = _objectWithoutProperties(_ref8, ["name", "key", "onChange", "onBlur", "setFieldValue"]);

    return _react.default.createElement("input", _extends({
      name: name,
      key: key,
      onChange: onChange,
      onBlur: onBlur
    }, additionalProps));
  }
};
var _default2 = defaultMappings;
exports.default = _default2;