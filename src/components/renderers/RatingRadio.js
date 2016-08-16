import React, { PropTypes } from 'react';

function RatingRadio(props) {
  const id = props.id || `${props.name}-${props.value}`;

  return (
    <input
      {...props}
      type='radio'
      id={id}
    />
  );
}

RatingRadio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool
};

export default RatingRadio;
