import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapField from './MapField';

export default class MapFieldWrapper extends Component {
  shouldComponentUpdate(nextProps) {
    const { customShouldComponentUpdate } = this.props;
    return customShouldComponentUpdate
      ? customShouldComponentUpdate(this.props, nextProps)
      : true;
  }

  render() {
    return (
      <MapField
        {...this.props}
      />
    );
  }
}

MapFieldWrapper.propTypes = {
  customShouldComponentUpdate: PropTypes.func,
};

MapFieldWrapper.defaultProps = {
  customShouldComponentUpdate: null,
};
