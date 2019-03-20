import React from 'react';
import { assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import sinon from 'sinon';
import wait from 'waait';

import DynamicFormBuilder from '../../lib';

configure({ adapter: new Adapter() });

describe('Dynamic form builder', () => {
  it('renders the component', () => {
    const wrapper = mount(
      <DynamicFormBuilder form={[]} mappings={{}}>
      </DynamicFormBuilder>,
    );
    assert.include(wrapper.html(), 'div');
  });
});
