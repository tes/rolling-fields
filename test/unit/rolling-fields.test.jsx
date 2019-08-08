/* eslint-disable react/prop-types */
import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import RollingFields from '../../lib';
import defaultMappings from '../../lib/defaultMappings';

configure({ adapter: new Adapter() });

const defaultProps = {
  fields: [],
  mappings: defaultMappings,
  onSubmit: () => {},
  onChange: () => {},
  onBlur: () => {},
};

describe('Rolling fields', () => {
  it('creates a text input by default', () => {
    const fields = [
      {
        name: 'test',
      },
    ];
    const wrapper = mount(
      <RollingFields {...defaultProps} fields={fields} />,
    );
    assert.include(wrapper.html(), 'input');
    assert.include(wrapper.html(), 'test');
  });

  it('creates multiple text inputs by default', () => {
    const fields = [
      { name: 'test' },
      { name: 'test2' },
    ];
    const wrapper = mount(
      <RollingFields {...defaultProps} fields={fields} />,
    );
    const inputs = wrapper.find('input');
    assert.include(inputs.at(0).props(), { name: 'test' });
    assert.include(inputs.at(0).html(), 'input');
    assert.include(inputs.at(0).html(), 'test');
    assert.include(inputs.at(1).props(), { name: 'test2' });
    assert.include(inputs.at(1).html(), 'input');
    assert.include(inputs.at(1).html(), 'test2');
  });

  it('creates multiple text inputs by default with different types', () => {
    const fields = [
      { name: 'test' },
      { name: 'test2', type: 'password' },
    ];
    const wrapper = mount(
      <RollingFields fields={fields} onSubmit={() => {}} />,
    );

    const inputs = wrapper.find('input');
    assert.equal(inputs.length, 2);
    assert.include(inputs.at(0).props(), { name: 'test' });
    assert.include(inputs.at(1).props(), { name: 'test2', type: 'password' });
  });

  it('creates a boolean component ', () => {
    const fields = [
      { name: 'test1', type: 'boolean' },
    ];
    const wrapper = mount(
      <RollingFields fields={fields} onSubmit={() => {}} />,
    );
    const inputs = wrapper.find('input');

    assert.equal(inputs.length, 1);
    assert.include(inputs.at(0).props(), { name: 'test1', type: 'checkbox' });
  });

  it('creates a select component and passes the provided options down', () => {
    const fields = [
      { name: 'test', type: 'select', options: [{ value: 'first' }, { value: 'second', text: 'Second' }] },
    ];
    const wrapper = mount(
      <RollingFields fields={fields} onSubmit={() => {}} />,
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
    const fields = [
      { name: 'test', type: 'custom' },
    ];
    const mappings = {
      custom: ({ key, name }) => (<input key={key} name={name} />),
    };
    const wrapper = mount(
      <RollingFields fields={fields} mappings={mappings} />,
    );

    const inputs = wrapper.find('input');
    assert.equal(inputs.length, 1);
    assert.deepEqual(inputs.at(0).props(), { name: 'test' });
  });

  it('will give the mappings function access to the index of the field', () => {
    const dummyOnChange = () => {};
    const fields = [
      { name: 'test1', type: 'custom' },
      { name: 'test2', type: 'custom' },
      { name: 'test3', type: 'custom' },
    ];
    const mappings = {
      custom: ({ key, name, index }) => (
        <input
          key={key}
          name={name}
          value={index}
          onChange={dummyOnChange}
        />
      ),
    };
    const wrapper = mount(
      <RollingFields fields={fields} mappings={mappings} />,
    );

    const inputs = wrapper.find('input');
    assert.equal(inputs.length, 3);
    assert.deepEqual(inputs.at(0).props(), { name: 'test1', value: 0, onChange: dummyOnChange });
    assert.deepEqual(inputs.at(1).props(), { name: 'test2', value: 1, onChange: dummyOnChange });
    assert.deepEqual(inputs.at(2).props(), { name: 'test3', value: 2, onChange: dummyOnChange });
  });

  it('will override the default submit button implementation', () => {
    const fields = [
      { name: 'test', type: 'custom' },
      { type: 'submit', text: 'Save' },
    ];
    const wrapper = mount(
      <RollingFields fields={fields} onSubmit={() => {}} />,
    );

    const button = wrapper.find('button');
    assert.equal(button.length, 1);
    assert.deepEqual(button.at(0).props(), { type: 'submit', children: 'Save' });
  });

  it('will call the onSubmit function on submit button click', () => {
    const fields = [
      { name: 'test' },
      { type: 'submit' },
    ];
    const onSubmitSpy = spy();

    const wrapper = mount(
      <form onSubmit={onSubmitSpy}>
        <RollingFields
          fields={fields}
        />
      </form>,
    );

    const button = wrapper.find('button');
    button.simulate('submit');
    assert.equal(onSubmitSpy.calledOnce, true);
  });

  it('will render the input with the given value', () => {
    const fields = [
      { name: 'test', value: 'Hello!' },
    ];

    const wrapper = mount(
      <RollingFields
        fields={fields}
      />,
    );

    const input = wrapper.find('input');
    assert.equal(input.props().value, 'Hello!');
  });

  it('will render the input and assign initial values', () => {
    const fields = [
      { name: 'test' },
      { name: 'another test' },
      { name: 4 },
    ];

    const initialValues = {
      test: 'First value',
      'another test': 'Second value',
      4: 'Final value',
    };

    const wrapper = mount(
      <RollingFields
        fields={fields}
        initialValues={initialValues}
      />,
    );

    const inputs = wrapper.find('input');
    assert.equal(inputs.getElements()[0].props.defaultValue, 'First value');
    assert.equal(inputs.getElements()[1].props.defaultValue, 'Second value');
    assert.equal(inputs.getElements()[2].props.defaultValue, 'Final value');
    assert.include(wrapper.children().at(0).html(), 'value="First value"');
    assert.include(wrapper.children().at(1).html(), 'value="Second value"');
    assert.include(wrapper.children().at(2).html(), 'value="Final value"');
  });

  it('will render the input and assign initial values to named fields based on object nesting', () => {
    const fields = [
      { name: 'level1.test' },
      { name: 'level1.level2.another test' },
      { name: 4 },
    ];

    const initialValues = {
      level1: {
        test: 'First value',
        level2: {
          'another test': 'Second value',
        },
      },
      4: 'Final value',
    };

    const wrapper = mount(
      <RollingFields
        fields={fields}
        initialValues={initialValues}
      />,
    );

    const inputs = wrapper.find('input');
    assert.equal(inputs.getElements()[0].props.defaultValue, 'First value');
    assert.equal(inputs.getElements()[1].props.defaultValue, 'Second value');
    assert.equal(inputs.getElements()[2].props.defaultValue, 'Final value');
    assert.include(wrapper.children().at(0).html(), 'value="First value"');
    assert.include(wrapper.children().at(1).html(), 'value="Second value"');
    assert.include(wrapper.children().at(2).html(), 'value="Final value"');
  });

  it('will use the provided field context when mapping components', () => {
    const placeHolderText = 'Place me in my holder!';

    const fields = [
      { name: 'test', type: 'custom' },
    ];
    const mappings = {
      custom: ({ key, name }, fieldContext) => (
        <input key={key} name={name} placeholder={fieldContext.placeHolderText} />
      ),
    };
    const wrapper = mount(
      <RollingFields
        fields={fields}
        mappings={mappings}
        fieldContext={{ placeHolderText }}
      />,
    );
    const inputs = wrapper.find('input');
    assert.equal(inputs.length, 1);
    assert.deepEqual(inputs.at(0).props(), { name: 'test', placeholder: placeHolderText });
  });

  it('will call the provided setFieldValue function', () => {
    const fields = [
      { name: 'test', type: 'custom' },
    ];
    const mappings = {
      custom: ({ key, name, setFieldValue }) => (
        <input key={key} name={name} onChange={e => setFieldValue(name, e.target.value)} />
      ),
    };
    const setFieldValueSpy = spy();

    const wrapper = mount(
      <RollingFields
        fields={fields}
        mappings={mappings}
        setFieldValue={setFieldValueSpy}
        onSubmit={defaultProps.onSubmit}
      />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    assert.equal(setFieldValueSpy.calledOnce, true);
  });

  it('will call the provided onChange function', () => {
    const fields = [
      { name: 'test' },
    ];
    const onChangeSpy = spy();

    const wrapper = mount(
      <RollingFields
        fields={fields}
        onChange={onChangeSpy}
        onSubmit={defaultProps.onSubmit}
      />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    assert.equal(onChangeSpy.calledOnce, true);
  });

  it('will call the provided onChange function for the select field', () => {
    const testValue = 'testValue';
    const fields = [
      { type: 'select', options: [{ value: testValue }] },
    ];
    const onChangeSpy = spy();

    const wrapper = mount(
      <RollingFields
        fields={fields}
        onChange={onChangeSpy}
        onSubmit={defaultProps.onSubmit}
      />,
    );

    wrapper.find('select').simulate('change', { target: { value: testValue } });
    assert.equal(onChangeSpy.calledOnce, true);
    assert.equal(onChangeSpy.getCall(0).args[0].target.value, testValue);
  });

  it('will call the provided onChange function for the field', () => {
    const onChangeSpy = spy();
    const onFieldChangeSpy = spy();
    const fields = [
      { name: 'testWithOnChange', onChange: onFieldChangeSpy },
    ];

    const wrapper = mount(
      <RollingFields
        fields={fields}
        onChange={onChangeSpy}
        onSubmit={defaultProps.onSubmit}
      />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    assert.equal(onChangeSpy.called, false);
    assert.equal(onFieldChangeSpy.calledOnce, true);
  });

  it('will call the provided onChange function for the select field', () => {
    const onChangeSpy = spy();
    const onFieldChangeSpy = spy();
    const testValue = 'testValue';

    const fields = [
      {
        type: 'select', options: [{ value: testValue }], name: 'testWithOnChange', onChange: onFieldChangeSpy,
      },
    ];

    const wrapper = mount(
      <RollingFields
        fields={fields}
        onChange={onChangeSpy}
        onSubmit={defaultProps.onSubmit}
      />,
    );

    wrapper.find('select').simulate('change', { target: { value: testValue } });
    assert.equal(onChangeSpy.called, false);
    assert.equal(onFieldChangeSpy.calledOnce, true);
    assert.equal(onFieldChangeSpy.getCall(0).args[0].target.value, testValue);
  });

  it('will call the provided onBlur function', () => {
    const fields = [
      { name: 'test' },
    ];
    const onBlurSpy = spy();

    const wrapper = mount(
      <RollingFields fields={fields} onBlur={onBlurSpy} onSubmit={defaultProps.onSubmit} />,
    );

    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    wrapper.find('input').simulate('blur');
    assert.equal(onBlurSpy.calledOnce, true);
  });

  it('will call the provided onBlur function for the field', () => {
    const onBlurSpy = spy();
    const onFieldBlurSpy = spy();
    const fields = [
      { name: 'testWithOnBlur', onBlur: onFieldBlurSpy },
    ];

    const wrapper = mount(
      <RollingFields fields={fields} onBlur={onBlurSpy} onSubmit={defaultProps.onSubmit} />,
    );

    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    wrapper.find('input').simulate('blur');
    assert.equal(onBlurSpy.called, false);
    assert.equal(onFieldBlurSpy.calledOnce, true);
  });

  it('when given values produces controlled components', () => {
    const fields = [
      { name: 'test1' },
      { name: 'test2' },
    ];

    const values = {
      test1: 1000,
      test2: 'Great value',
    };

    const wrapper = mount(
      <RollingFields fields={fields} values={values} />,
    );

    assert.include(wrapper.children().first().html(), 'value="1000"');
    assert.include(wrapper.children().last().html(), 'value="Great value"');

    const updatedValues = {
      test1: 1001,
      test2: 'Greatest value',
    };

    wrapper.setProps({ values: updatedValues });
    assert.include(wrapper.children().first().html(), 'value="1001"');
    assert.include(wrapper.children().last().html(), 'value="Greatest value"');
  });

  it('when given values produces controlled components', () => {
    const fields = [
      { name: 'test1' },
      { name: 'test2' },
    ];

    const values = {
      test1: 1000,
      test2: 'Great value',
    };

    const wrapper = mount(
      <RollingFields fields={fields} values={values} />,
    );

    const inputs = wrapper.find('input');
    assert.equal(inputs.getElements()[0].props.value, 1000);
    assert.equal(inputs.getElements()[1].props.value, 'Great value');
    assert.include(wrapper.children().at(0).html(), 'value="1000"');
    assert.include(wrapper.children().at(1).html(), 'value="Great value"');

    const updatedValues = {
      test1: 1001,
      test2: 'Greatest value',
    };

    wrapper.setProps({ values: updatedValues });
    const updatedInputs = wrapper.find('input');
    assert.equal(updatedInputs.getElements()[0].props.value, 1001);
    assert.equal(updatedInputs.getElements()[1].props.value, 'Greatest value');
    assert.include(wrapper.children().at(0).html(), 'value="1001"');
    assert.include(wrapper.children().at(1).html(), 'value="Greatest value"');
  });

  it('will render the controlled input and assign values to named fields based on object nesting', () => {
    const fields = [
      { name: 'level1.test' },
      { name: 'level1.level2.another test' },
      { name: 4 },
    ];

    const values = {
      level1: {
        test: 'First value',
        level2: {
          'another test': 'Second value',
        },
      },
      4: 'Final value',
    };

    const wrapper = mount(
      <RollingFields
        fields={fields}
        values={values}
      />,
    );

    const inputs = wrapper.find('input');
    assert.equal(inputs.getElements()[0].props.value, 'First value');
    assert.equal(inputs.getElements()[1].props.value, 'Second value');
    assert.equal(inputs.getElements()[2].props.value, 'Final value');
    assert.include(wrapper.children().at(0).html(), 'value="First value"');
    assert.include(wrapper.children().at(1).html(), 'value="Second value"');
    assert.include(wrapper.children().at(2).html(), 'value="Final value"');
  });

  it('will only update according to the customShouldComponentUpdate if provided', () => {
    const fields = [
      { name: 'test' },
      { name: 'test2' },
      { name: 'frozenValue' },
    ];

    const values = {
      test: 'First value',
      test2: 'Second value',
      frozenValue: 'Should not update',
    };

    const customShouldComponentUpdateFunction = props => props.name !== 'frozenValue';

    const wrapper = mount(
      <RollingFields
        fields={fields}
        values={values}
        customShouldComponentUpdate={customShouldComponentUpdateFunction}
      />,
    );

    const inputs = wrapper.find('input');
    assert.equal(inputs.getElements()[0].props.value, 'First value');
    assert.equal(inputs.getElements()[1].props.value, 'Second value');
    assert.equal(inputs.getElements()[2].props.value, 'Should not update');
    assert.include(wrapper.children().at(0).html(), 'value="First value"');
    assert.include(wrapper.children().at(1).html(), 'value="Second value"');
    assert.include(wrapper.children().at(2).html(), 'value="Should not update"');
    const updatedValues = {
      test: 'First value',
      test2: 'THIS SHOULD CHANGE',
      frozenValue: 'THIS SHOULD STAY THE SAME AS BEFORE',
    };

    wrapper.setProps({ values: updatedValues });
    wrapper.update();
    const updatedInputs = wrapper.find('input');
    assert.equal(updatedInputs.getElements()[0].props.value, 'First value');
    assert.equal(updatedInputs.getElements()[1].props.value, 'THIS SHOULD CHANGE');
    assert.equal(updatedInputs.getElements()[2].props.value, 'Should not update');
    assert.include(wrapper.children().at(0).html(), 'value="First value"');
    assert.include(wrapper.children().at(1).html(), 'value="THIS SHOULD CHANGE"');
    assert.include(wrapper.children().at(2).html(), 'value="Should not update"');
  });
});
