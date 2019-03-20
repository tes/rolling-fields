import React from 'react';
import { assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import DynamicFormBuilder from '../../lib';

configure({ adapter: new Adapter() });

describe('Dynamic form builder', () => {
  it('renders the component', () => {
    const wrapper = mount(
      <DynamicFormBuilder form={[]} mappings={{}} />,
    );
    assert.include(wrapper.html(), 'form');
  });

  it('creates a text input by default', () => {
    const form = [
      {
        name: 'test',
      },
    ];
    const wrapper = mount(
      <DynamicFormBuilder form={form} mappings={{}} />,
    );
    assert.include(wrapper.html(), 'input');
    assert.include(wrapper.html(), 'test');
  });
});
