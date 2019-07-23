import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapFields from './MapFields';
import defaultMappings from './defaultMappings';

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

export default class DynamicFieldBuilder extends Component {
  render() {
    const {
      fields, mappings: customMappings, onChange, onBlur, setFieldValue, initialValues,
    } = this.props;
    const mappings = { ...defaultMappings, ...customMappings };
    return (fields.map((field, index) => {
      const { name, type } = field;
      const value = initialValues && getProp(initialValues, name, '');
      const fieldWithValue = value && { value, ...field };
      const key = (`${name}${index}`).replace(/\s/g, '');
      const mappingProps = {
        index,
        key,
        name,
        type,
        mappings,
        onChange,
        onBlur,
        setFieldValue,
        field: fieldWithValue || field,
        value,
      };
      return <MapFields {...mappingProps} />;
    })
    );
  }
}

DynamicFieldBuilder.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  mappings: PropTypes.shape(),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  setFieldValue: PropTypes.func,
  initialValues: PropTypes.shape(),
};

DynamicFieldBuilder.defaultProps = {
  mappings: defaultMappings,
  onChange: () => {},
  onBlur: () => {},
  setFieldValue: () => {},
};
