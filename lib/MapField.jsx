/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class MapField extends Component {
  shouldComponentUpdate(nextProps) {
    const { value, defaultValue } = this.props;
    return (value !== nextProps.value) || (defaultValue !== nextProps.defaultValue);
  }

  render() {
    const {
      id,
      name,
      type,
      index,
      mappings,
      onChange,
      onBlur,
      setFieldValue,
      value,
      defaultValue,
      field,
      fieldContext,
    } = this.props;

    if (!mappings.default || typeof mappings.default !== 'function') {
      return <input name={name} key={id} onChange={onChange} onBlur={onBlur} />;
    }

    return mappings[type]
      ? mappings[type]({
        value,
        defaultValue,
        index,
        key: id,
        onChange,
        onBlur,
        setFieldValue,
        ...field,
      }, fieldContext)
      : mappings.default({
        value,
        defaultValue,
        index,
        key: id,
        onChange,
        onBlur,
        setFieldValue,
        ...field,
      }, fieldContext);
  }
}

export default MapField;
