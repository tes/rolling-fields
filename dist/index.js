"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DynamicFieldBuilder;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generateMappings = _interopRequireDefault(require("./generateMappings"));

var _defaultMappings = _interopRequireDefault(require("./defaultMappings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function DynamicFieldBuilder(_ref) {
  var fields = _ref.fields,
      customMappings = _ref.mappings,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur;

  var mappings = _objectSpread({}, _defaultMappings.default, customMappings);

  return fields.map(function (field, index) {
    var name = field.name,
        type = field.type;
    var key = "".concat(name).concat(index).replace(/\s/g, '');
    var mappingVariables = {
      key: key,
      name: name,
      type: type,
      mappings: mappings,
      onChange: onChange,
      onBlur: onBlur,
      field: field
    };
    return (0, _generateMappings.default)(_objectSpread({}, mappingVariables));
  });
}

DynamicFieldBuilder.propTypes = {
  fields: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  mappings: _propTypes.default.shape(),
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func
};
DynamicFieldBuilder.defaultProps = {
  mappings: _defaultMappings.default,
  onChange: function onChange() {},
  onBlur: function onBlur() {}
};