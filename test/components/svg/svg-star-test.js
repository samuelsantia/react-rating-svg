import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import SVGStar from '../../../src/components/svg/SVGStar';

describe('SVGStar Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SVGStar />);
  });

  it('should exist', () => {
    expect(wrapper).toExist();
  });
})
