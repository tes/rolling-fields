import React from 'react';
import PropTypes from 'prop-types';

const DynamicFormBuilder = ({ form = [], mappings = {} }) => (
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
  mappings: PropTypes.object.isRequired,
};

export default DynamicFormBuilder;
