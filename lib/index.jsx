import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */
export const defaultMappings = {
  string: ({
    name, key, onChange, onBlur, ...additionalProps
  }) => (<input name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps} />),
  number: ({
    name, key, onChange, onBlur, ...additionalProps
  }) => (<input name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps} type="number" />),
  boolean: ({
    name, key, onChange, onBlur, ...additionalProps
  }) => (<input name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps} type="checkbox" />),
  select: ({
    name, key, options, onChange, onBlur, ...additionalProps
  }) => (
    <select name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps}>
      {options.map(
        ({ value, text, ...optionProps }) => (
          <option key={Math.random() * 100} value={value} {...optionProps}>
            {text || value}
          </option>
        ),
      )
      }
    </select>
  ),
  password: ({
    name, key, onChange, onBlur, ...additionalProps
  }) => (<input name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps} type="password" />),
  submit: ({ text = 'Submit', key }) => (<button key={key} type="submit">{text}</button>),
};
/* eslint-enable react/prop-types */

const DynamicFormBuilder = ({
  form, mappings, onSubmit, onChange, onBlur,
}) => {
  let hasCustomSubmit = false;
  return (
    <form onSubmit={onSubmit}>
      {form.map((field, index) => {
        const { name, type = 'string' } = field;
        if (type === 'submit') hasCustomSubmit = true;
        const key = `${name}${index}`;
        return mappings[type] ? mappings[type]({
          key, onChange, onBlur, ...field,
        }) : <input name={name} key={key} onChange={onChange} onBlur={onBlur} />;
      })}
      {!hasCustomSubmit && <button type="submit">Submit</button>}
    </form>
  );
};

DynamicFormBuilder.propTypes = {
  form: PropTypes.arrayOf(PropTypes.object).isRequired,
  mappings: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

DynamicFormBuilder.defaultProps = {
  mappings: defaultMappings,
  onChange: () => {},
  onBlur: () => {},
};

export default DynamicFormBuilder;
