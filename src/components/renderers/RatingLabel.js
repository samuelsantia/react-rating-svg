import React, { PropTypes } from 'react';
import propsValidations from '../../utils/props-validations';

import '../../scss/_rating-label.scss';

function RatingLabel(props) {
  const SvgSymbol = props.svgSymbol;

  return (
    <label htmlFor={props.id} className='r-rating-label'>
      <svg className='r-rating-label-svg' {...props.svgAttrs}>
        <SvgSymbol />
      </svg>
    </label>
  );
}

RatingLabel.propTypes = {
  id: PropTypes.string.isRequired,
  svgSymbol: PropTypes.oneOfType([
    propsValidations.ReactClass,
    PropTypes.func
  ]).isRequired,
  svgAttrs: PropTypes.object.isRequired
};

export default RatingLabel;
