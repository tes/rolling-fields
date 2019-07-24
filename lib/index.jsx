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

const enrichField = (field, value, defaultValue) => {
  let enrichedField = { ...field };
  if (value) {
    enrichedField = { value, ...enrichedField };
  }
  if (defaultValue) {
    enrichedField = { defaultValue, ...enrichedField };
  }
  return enrichedField;
};
/* eslint-enable no-param-reassign */

export default class DynamicFieldBuilder extends Component {
  render() {
    const {
      fields, mappings: customMappings, onChange, onBlur, setFieldValue, initialValues, values,
    } = this.props;
    const mappings = { ...defaultMappings, ...customMappings };
    return (fields.map((field, index) => {
      const { name, type } = field;
      const value = values && getProp(values, name, '');
      const defaultValue = initialValues && getProp(initialValues, name, '');
      const enrichedField = enrichField(field, value, defaultValue);

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
        field: enrichedField,
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
  values: PropTypes.shape(),
};

DynamicFieldBuilder.defaultProps = {
  mappings: defaultMappings,
  onChange: () => {},
  onBlur: () => {},
  setFieldValue: () => {},
  initialValues: null,
  values: null,
};
