import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';

import RatingRadio from '../../../src/components/renderers/RatingRadio';

describe('RatingRadio Component', () => {

  const validProps = {
    name: 'test',
    value: 1,
    checked: true,
    onChange: _noop
  };

  describe('props validations', () => {
    const requiredProps = ['name', 'value', 'onChange'];
    const invalidProps = {
      name: 1,
      value: '1',
      checked: 'true',
      onChange: 'function'
    };
    let spy;

    beforeEach(() => {
      RatingRadio.displayName = Math.random().toString();
      spy = expect.spyOn(console, 'error');
    });
    afterEach(() => spy.restore() );
    after(() => RatingRadio.displayName = 'RatingRadio');

    requiredProps.forEach(prop => {

      it(`should console error with null '${prop}'`, () => {
        const props = {
          ...validProps,
          [prop]: null
        };
        delete props[prop];

        shallow(<RatingRadio {...props} />);
        expect(spy).toHaveBeenCalled('console spy was not called');
      });
    });

    Object.keys(invalidProps).forEach( prop => {

      it(`should console error with invalid '${prop}' value`, () => {
        const props = {
          ...validProps,
          [prop]: invalidProps[prop]
        };

        shallow(<RatingRadio {...props} />);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('renderer component', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<RatingRadio {...validProps} />);
    });

    it('should exist', () => {
      expect(wrapper).toExist();
    });

    it('should render input type radio', () => {
      expect(wrapper.type()).toBe('input');
      expect(wrapper.prop('type')).toBe('radio');
    });
  });

  describe('renderer component props', () => {
    const testProps = {
      name: 'string',
      value: 'number',
      id: 'string',
      onChange: 'function',
      checked: 'boolean'
    };
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<RatingRadio {...validProps} />);
    });

    Object.keys(testProps).forEach( prop => {
      const type = testProps[prop];

      it (`should have '${prop}' of type '${type}' property`, () => {
        expect(wrapper.prop(prop)).toExist();
        expect(wrapper.prop(prop)).toBeA(type);
      });
    });

    it(`should get id from prop if is defined`, () => {
      const wrapper = shallow(<RatingRadio {...{ id: 'test', ...validProps }} />);
      const props = wrapper.props;

      expect(wrapper.prop('id')).toBe('test');
    });
    it(`should get id from name and value if is not id defined`, () => {
      expect(wrapper.prop('id')).toBe(`${validProps.name}-${validProps.value}`);
    });
  });

  describe('#onChange prop', () => {
    let spy, wrapper;

    beforeEach(() => {
      spy = expect.createSpy();
      wrapper = mount(<RatingRadio {...validProps} onChange={spy} />)
    });

    afterEach(() => {
      spy.restore();
    });

    it('should call this props onChange when radio change', () => {
      wrapper.simulate('change');
      expect(spy).toHaveBeenCalled();
    })
  });
});

function _noop() {};
