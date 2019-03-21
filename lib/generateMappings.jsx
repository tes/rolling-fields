/* eslint-disable react/prop-types */
import React from 'react';

const generateMappings = ({
  key,
  name,
  type,
  mappings,
  onChange,
  onBlur,
  field,
}) => {
  if (mappings.default && typeof mappings.default === 'function') {
    return mappings[type]
      ? mappings[type]({
        key, onChange, onBlur, ...field,
      })
      : mappings.default({
        key, onChange, onBlur, ...field,
      });
  }
  return <input name={name} key={key} onChange={onChange} onBlur={onBlur} />;
};

export default generateMappings;
