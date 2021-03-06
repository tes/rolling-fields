import React from 'react';
import PropTypes from 'prop-types';
import defaultMappings from './defaultMappings';
import MapFieldWrapper from './MapFieldWrapper';

/* eslint-disable no-param-reassign */
const getProp = (object, keys, defaultVal) => {
  keys = Array.isArray(keys) ? keys : `${keys}`.split('.');
  object = object[keys[0]];
  if (object && keys.length > 1) {
    return getProp(object, keys.slice(1), defaultVal);
  }
  return object === undefined ? defaultVal : object;
};
/* eslint-enable no-param-reassign */

const DynamicFieldBuilder = ({
  fields,
  fieldContext,
  mappings: customMappings,
  onChange,
  onBlur,
  setFieldValue,
  initialValues,
  values,
  customShouldComponentUpdate,
  errors,
}) => {
  const mappings = { ...defaultMappings, ...customMappings };
  return (fields.map((field, index) => {
    const { name, type } = field;
    const error = errors && getProp(errors, name);
    const value = values && getProp(values, name, '');
    const defaultValue = initialValues && getProp(initialValues, name, '');
    const id = (`${name}${index}`).replace(/\s/g, '');
    const mappingProps = {
      index,
      id,
      key: id,
      name,
      type,
      mappings,
      onChange,
      onBlur,
      setFieldValue,
      value,
      defaultValue,
      field,
      customShouldComponentUpdate,
      error,
    };
    return <MapFieldWrapper {...mappingProps} fieldContext={fieldContext} />;
  })
  );
};

DynamicFieldBuilder.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  fieldContext: PropTypes.shape(),
  mappings: PropTypes.shape(),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  setFieldValue: PropTypes.func,
  initialValues: PropTypes.shape(),
  values: PropTypes.shape(),
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

DynamicFieldBuilder.defaultProps = {
  mappings: defaultMappings,
  onChange: () => {},
  onBlur: () => {},
  setFieldValue: () => {},
  initialValues: undefined,
  values: undefined,
};

export default DynamicFieldBuilder;
