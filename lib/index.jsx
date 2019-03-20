import React from 'react';
import PropTypes from 'prop-types';

const DynamicFormBuilder = ({ form = [], mappings = {} }) => {
  return (<div></div>);
};

DynamicFormBuilder.propTypes = {
  form: PropTypes.arrayOf(PropTypes.object).isRequired,
  mappings: PropTypes.object.isRequired,
};

export default DynamicFormBuilder
