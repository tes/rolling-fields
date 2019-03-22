import PropTypes from 'prop-types';
import generateMappings from './generateMappings';
import defaultMappings from './defaultMappings';

export default function DynamicFieldBuilder({
  fields, mappings: customMappings, onChange, onBlur,
}) {
  const mappings = { ...defaultMappings, ...customMappings };
  return (fields.map((field, index) => {
    const { name, type } = field;
    const key = (`${name}${index}`).replace(/\s/g, '');
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
  })
  );
}

DynamicFieldBuilder.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  mappings: PropTypes.shape(),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

DynamicFieldBuilder.defaultProps = {
  mappings: defaultMappings,
  onChange: () => {},
  onBlur: () => {},
};
