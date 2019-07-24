/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class MapFields extends Component {
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
      field,
    } = this.props;
    if (mappings.default && typeof mappings.default === 'function') {
      return mappings[type]
        ? mappings[type]({
          index, key: id, onChange, onBlur, setFieldValue, ...field,
        })
        : mappings.default({
          index, key: id, onChange, onBlur, setFieldValue, ...field,
        });
    }
    return <input name={name} key={id} onChange={onChange} onBlur={onBlur} />;
  }
}

export default MapFields;
