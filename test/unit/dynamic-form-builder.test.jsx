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
    assert.include(inputs.at(0).props(), { name: 'test' });
    assert.include(inputs.at(1).props(), { name: 'test2', type: 'password' });
  });

  it('creates a select component and passes the provided options down', () => {
    const form = [
      { name: 'test', type: 'select', options: [{ value: 'first' }, { value: 'second', text: 'Second' }] },
    ];
    const wrapper = mount(
      <DynamicFormBuilder form={form} onSubmit={() => {}} />,
    );

    const select = wrapper.find('select');
    assert.equal(select.length, 1);
    assert.include(select.at(0).props(), { name: 'test' });
    assert.equal(select.at(0).props().children[0].type, 'option');
    assert.deepEqual(select.at(0).props().children[0].props, { value: 'first', children: 'first' });
    assert.equal(select.at(0).props().children[1].type, 'option');
    assert.deepEqual(select.at(0).props().children[1].props, { value: 'second', children: 'Second' });
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

  it('will call the provided onChange function', () => {
    const form = [
      { name: 'test' },
    ];
    const onChangeSpy = spy();

    const wrapper = mount(
      <DynamicFormBuilder form={form} onChange={onChangeSpy} onSubmit={defaultProps.onSubmit} />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    assert.equal(onChangeSpy.calledOnce, true);
  });

  it('will call the provided onChange function for the select field', () => {
    const testValue = 'testValue';
    const form = [
      { type: 'select', options: [{ value: testValue }] },
    ];
    const onChangeSpy = spy();

    const wrapper = mount(
      <DynamicFormBuilder form={form} onChange={onChangeSpy} onSubmit={defaultProps.onSubmit} />,
    );

    wrapper.find('select').simulate('change', { target: { value: testValue } });
    assert.equal(onChangeSpy.calledOnce, true);
    assert.equal(onChangeSpy.getCall(0).args[0].target.value, testValue);
  });

  it('will call the provided onChange function for the field', () => {
    const onChangeSpy = spy();
    const onFieldChangeSpy = spy();
    const form = [
      { name: 'testWithOnChange', onChange: onFieldChangeSpy },
    ];

    const wrapper = mount(
      <DynamicFormBuilder form={form} onChange={onChangeSpy} onSubmit={defaultProps.onSubmit} />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    assert.equal(onChangeSpy.called, false);
    assert.equal(onFieldChangeSpy.calledOnce, true);
  });

  it('will call the provided onChange function for the select field', () => {
    const onChangeSpy = spy();
    const onFieldChangeSpy = spy();
    const testValue = 'testValue';

    const form = [
      {
        type: 'select', options: [{ value: testValue }], name: 'testWithOnChange', onChange: onFieldChangeSpy,
      },
    ];

    const wrapper = mount(
      <DynamicFormBuilder form={form} onChange={onChangeSpy} onSubmit={defaultProps.onSubmit} />,
    );

    wrapper.find('select').simulate('change', { target: { value: testValue } });
    assert.equal(onChangeSpy.called, false);
    assert.equal(onFieldChangeSpy.calledOnce, true);
    assert.equal(onFieldChangeSpy.getCall(0).args[0].target.value, testValue);
  });

  it('will call the provided onBlur function', () => {
    const form = [
      { name: 'test' },
    ];
    const onBlurSpy = spy();

    const wrapper = mount(
      <DynamicFormBuilder form={form} onBlur={onBlurSpy} onSubmit={defaultProps.onSubmit} />,
    );

    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    wrapper.find('input').simulate('blur');
    assert.equal(onBlurSpy.calledOnce, true);
  });

  it('will call the provided onBlur function for the field', () => {
    const onBlurSpy = spy();
    const onFieldBlurSpy = spy();
    const form = [
      { name: 'testWithOnBlur', onBlur: onFieldBlurSpy },
    ];

    const wrapper = mount(
      <DynamicFormBuilder form={form} onBlur={onBlurSpy} onSubmit={defaultProps.onSubmit} />,
    );

    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    wrapper.find('input').simulate('blur');
    assert.equal(onBlurSpy.called, false);
    assert.equal(onFieldBlurSpy.calledOnce, true);
  });
});
