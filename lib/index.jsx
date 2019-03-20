import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */
export const defaultMappings = {
  string: ({ name, key }) => (<input name={name} key={key} />),
  password: ({ name, key }) => (<input name={name} key={key} type="password" />),
};
/* eslint-enable react/prop-types */

const DynamicFormBuilder = ({ form, mappings }) => (
  <form>
    {form.map((field, index) => {
      const { name, type = 'string' } = field;
      const key = `${name}${index}`;
      return mappings[type] ? mappings[type]({ key, ...field }) : <input name={name} key={key} />;
    })}
  </form>
);

DynamicFormBuilder.propTypes = {
  form: PropTypes.arrayOf(PropTypes.object).isRequired,
  mappings: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

DynamicFormBuilder.defaultProps = {
  mappings: defaultMappings,
};

export default DynamicFormBuilder;
