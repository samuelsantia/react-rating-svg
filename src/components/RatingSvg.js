import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import propsValidations from '../utils/props-validations';
import iterators from '../utils/iterators';

import RatingRadio from './renderers/RatingRadio';
import RatingLabel from './renderers/RatingLabel';
import SVGStar from './svg/SVGStar';

import '../scss/_rating-svg.scss';

function isControlled(props) {
  return props.value !== undefined;
}

class RatingSvg extends React.Component {

  constructor(props) {
    super(props);

    const _isControlled = this._isControlled = isControlled(props);
    // autobindings
    this.handleChange = this.handleChange.bind(this);

    this.state = !_isControlled ? { value: props.defaultValue || null } : {};
  }

  componentWillReceiveProps(nextProps) {
    const _isControlled = isControlled(nextProps);

    /* eslint-disable no-console */
    if ( !this._isControlled && _isControlled ) {
      console.warn(
        'RatingSVG is changing from uncontrolled component to controlled component. ' +
        'It should not switch from uncontrolled to controlled (or viceversa). ' +
        'This behaviour will throw an error in near future.'
      );

      this.setControlled(_isControlled);
    }

    if ( this._isControlled && !_isControlled ) {
      console.warn(
        'RatingSVG is changing from controlled component to uncontrolled component. ' +
        'It should not switch from controlled to uncontrolled (or viceversa). ' +
        'This behaviour will throw an error in near future.'
      );

      this.setControlled(_isControlled);
    }
    /* eslint-enable no-console */
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  setControlled(isControlled) {
    this._isControlled = isControlled;

    this.setState(isControlled ? {} : { value: this.props.value || null });
  }

  getValue() {
    return this._isControlled ? this.props.value : this.state.value;
  }

  triggerChange(value) {
    const { name, onChange } = this.props;

    if ( typeof onChange === 'function' ) {
      onChange(value, name);
    }
  }

  handleChange(event) {
    const value = parseInt(event.target.value);

    if (value === this.getValue()) return;

    if ( this._isControlled ) {
      this.triggerChange(value);
    } else {
      this.setState({ value }, () => {
        this.triggerChange(value)
      });
    }
  }

  getRatingsSymbols() {
    const { totalSymbols, name, svgSymbol, svgAttrs } = this.props;
    const wrapperValue = this.getValue();

    return iterators.mapTimes(totalSymbols, i => {
      const value = totalSymbols - i;

      return [
        <RatingRadio
          key={`radio-${value}`}
          value={value}
          name={name}
          onChange={this.handleChange}
          checked={value === wrapperValue}
        />,
        <RatingLabel
          key={`label-${value}`}
          id={`${name}-${value}`}
          svgSymbol={svgSymbol}
          svgAttrs={svgAttrs}
        />
      ]
    });
  }

  render() {
    return (
      <fieldset className='r-rating-svg'>
        {this.getRatingsSymbols()}
      </fieldset>
    );
  }
}

RatingSvg.propTypes = {
  totalSymbols: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  svgSymbol: PropTypes.oneOfType([
    propsValidations.ReactClass,
    PropTypes.func
  ]).isRequired,
  svgAttrs: PropTypes.object,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func
};

RatingSvg.defaultProps = {
  totalSymbols: 5,
  svgSymbol: SVGStar,
  svgAttrs: {
    viewBox: '0 0 22 22'
  }
};

export default RatingSvg;
