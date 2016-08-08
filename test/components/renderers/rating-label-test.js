import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import RatingLabel from '../../../src/components/renderers/RatingLabel';
import SVGStar from '../../../src/components/svg/SVGStar';

describe('RatingLabel Component', () => {
  const validProps = {
    id: 'test',
    svgSymbol: SVGStar,
    svgAttrs: {
      viewBox: '0 0 22 22'
    }
  };
  let wrapper, props;

  beforeEach(() => {
    wrapper = shallow(<RatingLabel {...validProps} />);
    props   = wrapper.props;
  });

  describe('props validations', () => {
    const requiredProps = ['id', 'svgSymbol'];
    const invalidProps  = {
      id: 1,
      svgSymbol: 1,
      svgAttrs: '{}'
    };
    let spy;

    beforeEach(() => {
      RatingLabel.displayName = Math.random().toString();
      spy = expect.spyOn(console, 'error');
    });
    afterEach(() => spy.restore() );
    after(() => RatingLabel.displayName = 'RatingLabel' );

    requiredProps.forEach(prop => {

      it(`should console error with null '${prop}'`, () => {
        const props = Object.assign({}, validProps, {
          [prop]: null
        });

        shallow(<RatingLabel {...props} />);
        expect(spy).toHaveBeenCalled();
      });
    });

    Object.keys(invalidProps).forEach( prop => {

      it(`should console error with invalid '${prop}' value`, () => {
        const props = Object.assign({}, validProps, {
          [prop]: invalidProps[prop]
        });

        shallow(<RatingLabel {...props} />);
        expect(spy).toHaveBeenCalled();
      });
    });

    it(`should no console error with valid 'svgSymbol'`, () => {

      shallow(<RatingLabel {...validProps} />);
      expect(spy).toNotHaveBeenCalled();
    });
  });

  describe('renderer component', () => {

    it('should exist', () => {
      expect(wrapper).toExist();
    });

    it('should render label with `r-rating-label` css class', () => {
      expect(wrapper.type()).toBe('label');
      expect(wrapper.hasClass('r-rating-label')).toBe(true);
    });
  });

  describe('renderer component props', () => {
    const testProps = {
      htmlFor: 'string'
    };

    Object.keys(testProps).forEach( prop => {
      const type = testProps[prop];

      it(`should have ${prop} of type ${type} property`, () => {
        expect(wrapper.prop(prop)).toExist();
        expect(wrapper.prop(prop)).toBeA(type);
      });
    });
  });

  describe('renderer component childs', () => {

    it('child should be a svg with `r-rating-label-svg css class` and `svgAttrs` props', () => {
      const svgAttrs = validProps.svgAttrs;
      const child = wrapper.childAt(0);
      expect(child).toExist();
      expect(child.type()).toBe('svg');
      expect(child.hasClass('r-rating-label-svg')).toBe(true);

      Object.keys(svgAttrs).forEach((attr) => {
        expect(child.prop(attr)).toBe(svgAttrs[attr]);
      });
    });

    it('should contains the svgSymbol component', () => {
      expect(wrapper.find('SVGStar').length).toBe(1);
    });
  });
});
