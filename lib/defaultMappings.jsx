/* eslint-disable react/prop-types */
import React from 'react';

const defaultMappings = {
  string: ({
    name, key, onChange, onBlur, setFieldValue, ...additionalProps
  }) => (<input name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps} />),
  number: ({
    name, key, onChange, onBlur, setFieldValue, ...additionalProps
  }) => (<input name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps} type="number" />),
  boolean: ({
    name, key, onChange, onBlur, setFieldValue, ...additionalProps
  }) => (<input name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps} type="checkbox" />),
  select: ({
    name, key, options, onChange, onBlur, setFieldValue, ...additionalProps
  }) => (
    <select name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps}>
      {options.map(
        ({ value, text, ...optionProps }) => (
          <option key={`${value}${text}`} value={value} {...optionProps}>
            {text || value}
          </option>
        ),
      )
      }
    </select>
  ),
  password: ({
    name, key, onChange, onBlur, setFieldValue, ...additionalProps
  }) => (<input name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps} type="password" />),
  submit: ({ text = 'Submit', key }) => (<button key={key} type="submit">{text}</button>),
  default: ({
    name, key, onChange, onBlur, setFieldValue, ...additionalProps
  }) => (<input name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps} />),
};

export default defaultMappings;
