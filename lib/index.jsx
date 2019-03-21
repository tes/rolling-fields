import React from 'react';
import PropTypes from 'prop-types';
import defaultMappings from './defaultMappings';
import generateMappings from './generateMappings';

const DynamicFormBuilder = ({
  fields, mappings, onSubmit, onChange, onBlur,
}) => (
  <form onSubmit={onSubmit}>
    {fields.map((field, index) => {
      const { name, type } = field;
      const key = `${name}${index}`;
      const mappingVariables = {
        key,
        name,
        type,
        mappings,
        onChange,
        onBlur,
        field,
      };
      return generateMappings({ ...mappingVariables });
    })}
  </form>
);

DynamicFormBuilder.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  mappings: PropTypes.shape(),
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
