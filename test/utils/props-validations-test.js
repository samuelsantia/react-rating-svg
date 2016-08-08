import React from 'react';
import propsValidations from '../../src/utils/props-validations';
import expect from 'expect';

describe('propsValidations module', () => {

  describe('#ReactComponent validator', () => {
    let validate;

    beforeEach(() => {
      validate = props => propsValidations.ReactClass(props, 'component', 'Fake');
    });

    it('should pass when valid react class component is passed', () => {
      const props = { component: class Fake extends React.Component{} };
      const result = validate(props);

      expect(result).toBe(undefined);
    });

    it('should pass when React.createClass component is passed', () => {
      const props = { component: React.createClass({ render() {} }) };
      const result = validate(props);

      expect(result).toBe(undefined);
    });

    it('should return Error when invalid function is passed', () => {
      const props = { component: function() {} };
      const result = validate(props);

      expect(result).toBeA(Error);
      expect(result.message).toInclude('component');
      expect(result.message).toInclude('Fake');
    });

    it('should return Error when invalid object is passed', () => {
      const props = { component: {} };
      const result = validate(props);

      expect(result).toBeA(Error);
      expect(result.message).toInclude('component');
      expect(result.message).toInclude('Fake');
    });

    it('should return Error when invalid class is passed', () => {
      const props = { component: class Fake{} };
      const result = validate(props);

      expect(result).toBeA(Error);
      expect(result.message).toInclude('component');
      expect(result.message).toInclude('Fake');
    });
  });
})
