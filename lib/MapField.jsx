/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';

class MapField extends PureComponent {
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
      error,
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
        error,
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
        error,
        ...field,
      }, fieldContext);
  }
}

export default MapField;
