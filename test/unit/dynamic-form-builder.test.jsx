/* eslint-disable react/prop-types */
import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import DynamicFormBuilder from '../../lib';

configure({ adapter: new Adapter() });

const defaultProps = {
  form: [],
  mappings: {},
  onSubmit: () => {},
};

describe('Dynamic form builder', () => {
  it('renders the form and submit button', () => {
    const wrapper = mount(
      <DynamicFormBuilder {...defaultProps} />,
    );
    assert.include(wrapper.html(), 'form');
    assert.include(wrapper.html(), 'submit');
  });

  it('creates a text input by default', () => {
    const form = [
      {
        name: 'test',
      },
    ];
    const wrapper = mount(
      <DynamicFormBuilder {...defaultProps} form={form} />,
    );
    assert.include(wrapper.html(), 'input');
    assert.include(wrapper.html(), 'test');
  });

  it('creates multiple text inputs by default', () => {
    const form = [
      { name: 'test' },
      { name: 'test2' },
    ];
    const wrapper = mount(
      <DynamicFormBuilder {...defaultProps} form={form} />,
    );
    assert.include(wrapper.html(), 'input');
    assert.include(wrapper.html(), 'test');
    assert.include(wrapper.html(), 'test2');
  });

  it('creates multiple text inputs by default with different types', () => {
    const form = [
      { name: 'test' },
      { name: 'test2', type: 'password' },
    ];
    const wrapper = mount(
      <DynamicFormBuilder form={form} onSubmit={() => {}} />,
    );

    const inputs = wrapper.find('input');
    assert.equal(inputs.length, 2);
    assert.deepEqual(inputs.at(0).props(), { name: 'test' });
    assert.deepEqual(inputs.at(1).props(), { name: 'test2', type: 'password' });
  });

  it('will use the mappings object and call the render function based on the type', () => {
    const form = [
      { name: 'test', type: 'custom' },
    ];
    const mappings = {
      custom: ({ key, name }) => (<input key={key} name={name} />),
    };
    const wrapper = mount(
      <DynamicFormBuilder form={form} mappings={mappings} onSubmit={() => {}} />,
    );

    const inputs = wrapper.find('input');
    assert.equal(inputs.length, 1);
    assert.deepEqual(inputs.at(0).props(), { name: 'test' });
  });

  it('will override the default submit button implementation', () => {
    const form = [
      { name: 'test', type: 'custom' },
      { type: 'submit', text: 'Save' },
    ];
    const wrapper = mount(
      <DynamicFormBuilder form={form} onSubmit={() => {}} />,
    );

    const button = wrapper.find('button');
    assert.equal(button.length, 1);
    assert.deepEqual(button.at(0).props(), { type: 'submit', children: 'Save' });
  });

  it('will call the provided onSubmit function on form submission', () => {
    const form = [
      { name: 'test' },
    ];
    const onSubmitSpy = spy();

    const wrapper = mount(
      <DynamicFormBuilder form={form} onSubmit={onSubmitSpy} />,
    );

    const button = wrapper.find('button');
    button.simulate('submit');
    assert.equal(onSubmitSpy.calledOnce, true);
  });
});
