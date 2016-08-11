import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';

import RatingSVG from '../../src/components/RatingSvg';
import RatingRadio from '../../src/components/renderers/RatingRadio';
import RatingLabel from '../../src/components/renderers/RatingLabel';
import SVGStar from '../../src/components/svg/SVGStar';

describe('RatingSVG Component', () => {
  const validProps = {
    totalSymbols: 5,
    svgSymbol: SVGStar,
    name: 'test'
  };

  describe('props validations', () => {
    const requiredProps = ['totalSymbols', 'name', 'svgSymbol'];
    const invalidProps  = {
      name: 1,
      totalSymbols: '1',
      value: '1',
      defaultValue: '1',
      onChange: 'func',
      svgSymbol: 'SVGStar',
      svgAttrs: '{}'
    };
    let spy;

    beforeEach( () => {
      RatingSVG.displayName = Math.random().toString();
      spy = expect.spyOn(console, 'error');
    });
    afterEach( () => spy.restore() );
    after( () => RatingSVG.displayName = 'RatingSVG' )

    requiredProps.forEach(prop => {

      it(`should console error with null ${prop}`, () => {
        const props = {
          ...validProps,
          [prop]: null
        };

        shallow(<RatingSVG {...props} />);
        expect(spy).toHaveBeenCalled();
      });
    });

    Object.keys(invalidProps).forEach( prop => {

      it(`should console error with invalid ${prop}`, () => {
        const props = {
          ...validProps,
          [prop]: invalidProps[prop]
        };

        shallow(<RatingSVG {...props} />);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('default props', () => {
    const defaultProps = {
      totalSymbols: 5,
      svgSymbol: SVGStar,
      svgAttrs: {
        viewBox: '0 0 22 22'
      }
    };

    Object.keys(defaultProps).forEach( prop => {

      it(`should have defaultProp '${prop}' with value ${defaultProps[prop]}`, () => {
        const props = { ...validProps };
        delete props[prop];
        const instance = shallow(<RatingSVG {...props} />).instance();

        expect(instance.props[prop]).toExist();
        expect(instance.props[prop]).toEqual(defaultProps[prop]);
      });
    });
  });

  describe('render component', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<RatingSVG {...validProps} />);
    });

    it('should exist', () => {
      expect(wrapper).toExist();
    });

    it('should render fieldset with `r-rating-svg` class', () => {
      expect(wrapper.type()).toBe('fieldset');
      expect(wrapper.hasClass('r-rating-svg')).toBe(true);
    });
  });

  describe('renderer childrens', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<RatingSVG {...validProps} />);
    });

    it('should render totalSymbols RatingRadio and RatinLabel components', () => {

      expect(wrapper.find('RatingRadio').length).toBe(validProps.totalSymbols);
      expect(wrapper.find('RatingLabel').length).toBe(validProps.totalSymbols);
    });

    it('should call `getRatingsSymbols` to create the ratings renderers', () => {
      const spy = expect.spyOn(RatingSVG.prototype, 'getRatingsSymbols');

      mount(<RatingSVG {...validProps} />);
      expect(spy.calls.length).toBe(1);
      spy.restore();
    });

    it('`getRatingsSymbols` should have correct behaviour', () => {
      const instance = wrapper.instance();
      const result = instance.getRatingsSymbols();

      expect(result).toBeA(Array);
      expect(result.length).toBe(validProps.totalSymbols);

      result.forEach((items, i) => {
        const [ radio, label ] = items;
        const value = validProps.totalSymbols - i;

        expect(mount(radio).type()).toBe(RatingRadio);
        expect(radio.key).toBe(`radio-${value}`);
        expect(radio.props.value).toBe(value);
        expect(radio.props.name).toBe(validProps.name);
        expect(radio.props.onChange).toBe(instance.handleChange);
        expect(radio.props.checked).toBe(false);

        expect(mount(label).type()).toBe(RatingLabel);
        expect(label.key).toBe(`label-${value}`);
        expect(label.props.id).toBe(`${validProps.name}-${value}`);
        expect(label.props.svgSymbol).toBe(validProps.svgSymbol);
        expect(label.props.svgAttrs).toEqual(instance.props.svgAttrs);
      });
    });

    describe('uncontrolled component', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(<RatingSVG {...validProps} defaultValue={3} />);
      });

      it('should check the defaultValue in first render and the state value when change', () => {
        const result = wrapper.instance().getRatingsSymbols();

        result.forEach((items, i) => {
          const [ radio ] = items;

          expect(radio.props.checked).toBe( validProps.totalSymbols - i === 3);
        });
      });

      it('should check the state value component radio', () => {
        wrapper.setState({ value: 5 });
        const result = wrapper.instance().getRatingsSymbols();
        result.forEach((items, i) => {
          const [ radio ] = items;
          expect(radio.props.checked).toBe( validProps.totalSymbols - i === 5);
        });
      });
    });

    describe('controlled component', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(<RatingSVG {...validProps} value={3} />);
      });

      it('should check the initial value passed', () => {

        const result = wrapper.instance().getRatingsSymbols();
        result.forEach((items, i) => {
          const [ radio ] = items;
          expect(radio.props.checked).toBe( validProps.totalSymbols - i === 3);
        });
      });

      it('should check the new value when prop change', () => {
        wrapper.setProps({ value: 5 });

        const result = wrapper.instance().getRatingsSymbols();
        result.forEach((items, i) => {
          const [ radio ] = items;
          expect(radio.props.checked).toBe( validProps.totalSymbols - i === 5);
        });
      });
    });
  });

  describe('_isControlled component', () => {
    let wrapper, instance;

    describe('with value prop', () => {

      beforeEach(() => {
        wrapper = shallow(<RatingSVG {...validProps} value={1} />);
        instance = wrapper.instance();
      });

      it('should be controlled', () => {
        expect(instance._isControlled).toBe(true);
      });

      it('should not have empty state', () => {
        expect(wrapper.state()).toEqual({});
      });

      it('should warn if you change to uncontrolled component and call to setControlled', () => {
        const spy = expect.spyOn(console, 'warn');
        const setSpy = expect.spyOn(instance, 'setControlled');

        wrapper.setProps({ value: undefined });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(
          'RatingSVG is changing from controlled component to uncontrolled component. ' +
          'It should not switch from controlled to uncontrolled (or viceversa). ' +
          'This behaviour will throw an error in near future.'
        );
        expect(setSpy).toHaveBeenCalled();
        expect(setSpy).toHaveBeenCalledWith(false);

        expect.restoreSpies()
      });
    });

    describe('without value prop', () => {

      beforeEach(() => {
        wrapper = mount(<RatingSVG {...validProps} />);
        instance = wrapper.instance();
      });

      it('should not be controlled', () => {
        expect(instance._isControlled).toBe(false);
      });

      it('should have state with value', () => {
        expect(wrapper.state()).toExist();
        expect(wrapper.state('value')).toBe(null);
      });

      it('should have state value with defaultValue', () => {
        const wrapper = shallow(<RatingSVG {...validProps} defaultValue={1} />);
        expect(wrapper.state('value')).toBe(1);
      });

      it('should warn if you change to controlled component and call to setControlled', () => {
        const spy = expect.spyOn(console, 'warn');
        const setSpy = expect.spyOn(instance, 'setControlled');

        wrapper.setProps({ value: 1 });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(
          'RatingSVG is changing from uncontrolled component to controlled component. ' +
          'It should not switch from uncontrolled to controlled (or viceversa). ' +
          'This behaviour will throw an error in near future.'
        );
        expect(setSpy).toHaveBeenCalled();
        expect(setSpy).toHaveBeenCalledWith(true);

        expect.restoreSpies();
      });
    });
  });

  describe('#setControlled method', () => {
    let wrapper, instance;

    beforeEach(() => {
      wrapper = shallow(<RatingSVG {...validProps} />);
      instance = wrapper.instance();
    });

    it('should change instance _isControlled', () => {
      instance.setControlled(true);
      expect(instance._isControlled).toBe(true);
      instance.setControlled(false);
      expect(instance._isControlled).toBe(false);
    });

    it('should call setState', () => {
      const spy = expect.spyOn(instance, 'setState');

      instance.setControlled(true);
      expect(spy).toHaveBeenCalled();
      expect(spy.calls[0].arguments[0]).toEqual({});
      spy.reset();

      instance.setControlled(false);
      expect(spy).toHaveBeenCalled();
      expect(spy.calls[0].arguments[0]).toEqual({ value: null });

      spy.restore();
    });

    it('should pass before prop value to state if change to uncontrolled', () => {
      const wrapper = mount(<RatingSVG {...validProps} value={1} />);
      const instance = wrapper.instance();
      const spy = expect.spyOn(instance, 'setState');

      wrapper.setProps({ value: undefined });
      expect(spy).toHaveBeenCalled();
      expect(spy.calls[0].arguments[0]).toEqual({ value: 1 });

      spy.restore();
    });
  });

  describe('#getValue method', () => {
    let wrapper, instance;

    describe('with controlled component', () => {

      beforeEach(() => {
        wrapper  = shallow(<RatingSVG {...validProps} value={1} />);
        instance = wrapper.instance();
      });

      it('should return instance props value', () => {
        expect(instance.getValue()).toBe(instance.props.value);
      });
    });

    describe('with uncontrolled component', () => {

      beforeEach(() => {
        wrapper  = shallow(<RatingSVG {...validProps} defaultValue={1} />);
        instance = wrapper.instance();
      });

      it('should return instance state value', () => {
        expect(instance.getValue()).toBe(wrapper.state('value'));
      });
    });
  });

  describe('#triggerChange method', () => {
    let wrapper, instance;

    beforeEach(() => {
      wrapper  = shallow(<RatingSVG {...validProps} />);
      instance = wrapper.instance();
    });

    it('should call this onChange prop', () =>{
      const spy = expect.createSpy();
      wrapper.setProps({ onChange: spy });

      instance.triggerChange(5);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(5, validProps.name);

      spy.restore();
    });

    it('should do nothing if onChange is null', () => {
      wrapper.setProps({ onChange: null });
      expect(instance.triggerChange(5)).toBe(undefined);
    });
  });

  describe('#handleChange method', () => {
    let wrapper, instance;

    beforeEach(() => {
      wrapper  = mount(<RatingSVG {...validProps} />);
      instance = wrapper.instance();
    });

    it('should exist and be a function', () => {
      expect(instance.handleChange).toExist();
      expect(instance.handleChange).toBeA('function');
    });

    it('should be binded to instance', () => {
      const spy = expect.spyOn(instance, 'handleChange');

      instance.handleChange();
      expect(spy).toHaveBeenCalled();
      expect(spy.calls[0].context).toBe(instance);

      spy.restore();
    });

    describe('with uncontrolled component', () => {

      it('should call setState in component', () => {
        const spy = expect.spyOn(instance, 'setState');

        wrapper.find('RatingRadio').first().simulate('change', {
          target: { value: 1 }
        });

        expect(spy).toHaveBeenCalled();
        expect(spy.calls[0].arguments[0]).toEqual({ value: 1 });

        spy.restore();
      });

      it('should call triggerChange method if value change', () => {
        const spy = expect.spyOn(instance, 'triggerChange');

        wrapper.find('RatingRadio').at(1).simulate('change', {
          target: { value: 2 }
        });
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(2);

        spy.restore();
      });

      it('should do nothing if value no change', () => {
        const spy = expect.spyOn(instance, 'triggerChange');
        wrapper.setState({ value: 1 });
        wrapper.find('RatingRadio').first().simulate('change', {
          target: { value: '1' }
        });

        expect(spy).toNotHaveBeenCalled();
      });
    });

    describe('with controlled component', () => {
      beforeEach(() => {
        wrapper = mount(<RatingSVG {...validProps} value={1} />);
        instance = wrapper.instance();
      });

      it('should call triggerChange method if value change', () => {
        const spy = expect.spyOn(instance, 'triggerChange');

        wrapper.find('RatingRadio').at(1).simulate('change', {
          target: { value: 2 }
        });
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(2);

        spy.restore();
      });

      it('should do nothing if value no change', () => {
        const spy = expect.spyOn(instance, 'triggerChange');
        wrapper.setProps({ value: 1 });
        wrapper.find('RatingRadio').first().simulate('change', {
          target: { value: '1' }
        });

        expect(spy).toNotHaveBeenCalled();
      });
    });
  });
});
