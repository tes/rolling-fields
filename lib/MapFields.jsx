/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class MapFields extends Component {
  shouldComponentUpdate(nextProps) {
    console.log('this.props:', this.props);
    console.log('nextProps:', nextProps);
    
    
    const { value } = this.props;
    console.log('value:', value);
    console.log('nextProps.value:', nextProps.value);
    //
    //
    // return nextProps.value !== value;
    return true;
  }

  render() {
    const {
      key,
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
          index, key, onChange, onBlur, setFieldValue, ...field,
        })
        : mappings.default({
          index, key, onChange, onBlur, setFieldValue, ...field,
        });
    }
    return <input name={name} key={key} onChange={onChange} onBlur={onBlur} />;
  }
}

export default MapFields;
