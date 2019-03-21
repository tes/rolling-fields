import React from 'react';
import PropTypes from 'prop-types';
import defaultMappings from './defaultMappings';

const DynamicFormBuilder = ({
  fields, mappings, onSubmit, onChange, onBlur,
}) => {
  let hasCustomSubmit = false;
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field, index) => {
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
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
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
