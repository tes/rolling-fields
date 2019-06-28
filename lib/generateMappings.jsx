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
}) => {
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
};

export default generateMappings;
