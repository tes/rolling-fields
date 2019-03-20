import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */
export const defaultMappings = {
  string: ({ name, key }) => (<input name={name} key={key} />),
  password: ({ name, key }) => (<input name={name} key={key} type="password" />),
  submit: ({ text = 'Submit', key }) => (<button type="submit" key={key}>{text}</button>),
};
/* eslint-enable react/prop-types */

const DynamicFormBuilder = ({ form, mappings, onSubmit }) => {
  let hasCustomSubmit = false;
  return (
    <form onSubmit={values => onSubmit(values)}>
      {form.map((field, index) => {
        const { name, type = 'string' } = field;
        if (type === 'submit') hasCustomSubmit = true;
        const key = `${name}${index}`;
        return mappings[type] ? mappings[type]({ key, ...field }) : <input name={name} key={key} />;
      })}
      {!hasCustomSubmit && <button type="submit">Submit</button>}
    </form>
  );
};

DynamicFormBuilder.propTypes = {
  form: PropTypes.arrayOf(PropTypes.object).isRequired,
  mappings: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onSubmit: PropTypes.func.isRequired,
};

DynamicFormBuilder.defaultProps = {
  mappings: defaultMappings,
};

export default DynamicFormBuilder;
