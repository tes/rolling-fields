import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DynamicFieldBuilder from '../lib';

const onSubmitAction = (evt, ...args) => {
  evt.preventDefault();
  action('submit')(evt, ...args);

  return false;
};

const customMappings = {
  customType: ({
    name, key, onChange, onBlur, ...additionalProps
  }) => (<input name={name} key={key} onChange={onChange} onBlur={onBlur} {...additionalProps} style={{ backgroundColor: '#bbbbbb' }} />),
};

const commonProperties = {
  onBlur: action('onBlur'),
  onChange: action('onChange'),
  onSubmit: onSubmitAction,
};

storiesOf('DynamicFieldBuilder', module)
  .add('with default mappings and one field', () => (
    <form onSubmit={onSubmitAction}>
      <DynamicFieldBuilder {...commonProperties} fields={[{ name: 'first_name' }]} />
    </form>
  ))
  .add('with default mappings with submit button', () => (
    <form onSubmit={onSubmitAction}>
      <DynamicFieldBuilder {...commonProperties} fields={[{ name: 'first_name' }, { type: 'submit' }]} />
    </form>
  ))
  .add('with custom mappings', () => (
    <form onSubmit={onSubmitAction}>
      <DynamicFieldBuilder {...commonProperties} fields={[{ name: 'first_name', type: 'customType' }]} mappings={customMappings} />
    </form>
  ));
