"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var generateMappings = function generateMappings(_ref) {
  var key = _ref.key,
      name = _ref.name,
      type = _ref.type,
      mappings = _ref.mappings,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      setFieldValue = _ref.setFieldValue,
      field = _ref.field;

  if (mappings.default && typeof mappings.default === 'function') {
    return mappings[type] ? mappings[type](_objectSpread({
      key: key,
      onChange: onChange,
      onBlur: onBlur,
      setFieldValue: setFieldValue
    }, field)) : mappings.default(_objectSpread({
      key: key,
      onChange: onChange,
      onBlur: onBlur,
      setFieldValue: setFieldValue
    }, field));
  }

  return _react.default.createElement("input", {
    name: name,
    key: key,
    onChange: onChange,
    onBlur: onBlur
  });
};

var _default = generateMappings;
exports.default = _default;