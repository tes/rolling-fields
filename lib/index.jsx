import PropTypes from 'prop-types';
import defaultMappings from './defaultMappings';
import generateMappings from './generateMappings';

const DynamicFieldBuilder = ({
  fields, mappings, onChange, onBlur,
}) => (fields.map((field, index) => {
  const { name, type } = field;
  const key = (`${name}${index}`).replace(/\s/g,'');
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

export default DynamicFieldBuilder;
