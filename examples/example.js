import React from 'react';
import { render } from 'react-dom';

import RatingSvg from '../src';

import './example.scss';

const Example = _ => (<RatingSvg name='example' />);

render(<Example />, document.getElementById('container'));
