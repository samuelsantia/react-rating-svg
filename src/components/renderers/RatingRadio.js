import React, { PropTypes } from 'react';

function RatingRadio(props) {
  const id = props.id || `${props.name}-${props.value}`;

  return (
    <input
      type='radio'
      id={id}
      name={props.name}
      value={props.value}
      checked={props.checked}
      onChange={props.onChange}
    />
  );
}

RatingRadio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  checked: PropTypes.bool
};

export default RatingRadio;
