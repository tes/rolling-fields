import React from 'react';
import PropTypes from 'prop-types';

const DynamicFormBuilder = ({ form = [], mappings = {} }) => (// eslint-disable-line no-unused-vars
  <form>
    {form.map((field, index) => {
      const { name } = field;
      const key = `${name}${index}`;
      return <input name={name} key={key} />;
    })}
  </form>
);

DynamicFormBuilder.propTypes = {
  form: PropTypes.arrayOf(PropTypes.object).isRequired,
  mappings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DynamicFormBuilder;
