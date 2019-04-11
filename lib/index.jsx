import PropTypes from 'prop-types';
import generateMappings from './generateMappings';
import defaultMappings from './defaultMappings';

export default function DynamicFieldBuilder({
  fields, mappings: customMappings, onChange, onBlur, setFieldValue, initialValues,
}) {
  const mappings = { ...defaultMappings, ...customMappings };
  return (fields.map((field, index) => {
    const { name, type } = field;
    const value = initialValues && initialValues[name];
    const fieldWithValue = value && { value, ...field };
    const key = (`${name}${index}`).replace(/\s/g, '');
    const mappingVariables = {
      key,
      name,
      type,
      mappings,
      onChange,
      onBlur,
      setFieldValue,
      field: fieldWithValue || field,
      value,
    };
    return generateMappings({ ...mappingVariables });
  })
  );
}

DynamicFieldBuilder.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  mappings: PropTypes.shape(),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  setFieldValue: PropTypes.func,
};

DynamicFieldBuilder.defaultProps = {
  mappings: defaultMappings,
  onChange: () => {},
  onBlur: () => {},
  setFieldValue: () => {},
};
