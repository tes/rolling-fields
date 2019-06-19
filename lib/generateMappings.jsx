/* eslint-disable react/prop-types */
import React from 'react';

const generateMappings = ({
  key,
  name,
  type,
  index,
  mappings,
  onChange,
  onBlur,
  setFieldValue,
  field,
}, fieldContext) => {
  if (!mappings.default || typeof mappings.default !== 'function') {
    return <input name={name} key={key} onChange={onChange} onBlur={onBlur} />;
  }
  return mappings[type]
    ? mappings[type]({
      index, key, onChange, onBlur, setFieldValue, ...field,
    }, fieldContext)
    : mappings.default({
      index, key, onChange, onBlur, setFieldValue, ...field,
    });
};

export default generateMappings;
