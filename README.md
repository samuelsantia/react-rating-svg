[![version](https://img.shields.io/npm/v/react-rating-svg.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/react-rating-svg)
[![Build status](https://img.shields.io/travis/samuelsantia/react-rating-svg.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/samuelsantia/react-rating-svg)
[![Coverage](https://img.shields.io/codecov/c/github/samuelsantia/react-rating-svg/master.svg?maxAge=2592000&style=flat-square)](https://codecov.io/gh/samuelsantia/react-rating-svg)
[![dependencies](https://img.shields.io/david/samuelsantia/react-rating-svg.svg?maxAge=2592000&style=flat-square)](https://david-dm.org/samuelsantia/react-rating-svg?view=list)
[![peerDependencies](https://img.shields.io/david/peer/samuelsantia/react-rating-svg.svg?maxAge=2592000&style=flat-square)](https://david-dm.org/samuelsantia/react-rating-svg?type=peer&view=list)

# React Rating SVG

> React component to rating. You can define your own SVG symbol to display in renderer component.

## Install

Run `npm install react-rating-svg` to get the component.

Make sure that you have installed `react`, `react-dom` and `react-addons-shallow-compare` to make it works.

## Basic Usage

Like react form components it can be controlled or uncontrolled component setting the value prop. You can see more in [official documentation](https://facebook.github.io/react/docs/forms.html).

### Uncontrolled component

```javascript
import { render } from 'react-dom';
import RatingSVG from 'react-rating-svg';

render(<RatingSVG name='my-rating' />, container)

```

### Controlled component

```javascript
import React from 'react';
import { render } from 'react-dom';
import RatingSVG from 'react-rating-svg';

class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: 0 };
    }

    handleChange(value, name) {
        console.log(name, value);
        this.setState({value: value});
    }

    render() {
        const { value } = this.state;

        return (
            <RatingSVG
                name='my-controlled-rating'
                value={value}
                onChange={this.handleChange}
            />
        );
    }
}

render(<MyComponent />, container);

```

## API
### react-rating-svg props

| name           | type                    |           default          | description     |
| -------------- | ----------------------- | :------------------------: | --------------- |
| `totalSymbols` | `number required`       |             `5`            | total rating svg symbols to render   |
| `name`         | `string required`       |                            | name for group form radios           |
| `value`        | `number`                |                            | value of component if is set the component it's controlled |
| `defaultValue` | `number`                |                            | initial value in uncontrolled component |
| `caption`      | `string`                |                            | renders a legend with passed text in rating fieldset |
| `className`    | `string`                |                            | custom css class to component        |
| `onChange`     | `Function(value, name)` |                            | called when the radios value changed |
| `disabled`     | `boolean`               |                            | disable the radio buttons preventing the change value |
| `readOnly`     | `boolean`               |                            | same as disbled, but renders a hidden field with the passed initialValue or value |
| `svgSymbol`    | `ReactComponentClass`   |          `SVGStar`         | Component class to render in label. See below how to customize svg symbols  |
| `svgAttrs`     | `object`                | `{ viewbox: '0 0 22 22' }` | Renderer svg attributes |

## SVG symbol customization
You can attach your own svg symbol to the component, todo you can create a React Component or stateless component function that returns the path or svg group to render inside label svg.

You can see an example in [default svg symbol](https://github.com/samuelsantia/react-rating-svg/blob/master/src/components/svg/SVGStar.js) attached by component.

***TODO:*** Add example to customize svg symbol.

## Styling SCSS
Remember import scss to your css styles.

```scss
@import 'node_modules/react-rating-svg/lib/scss/react-rating-svg.scss';
```

You can import separately too:
```scss
@import 'node_modules/react-rating-svg/lib/scss/rating-svg.scss';
@import 'node_modules/react-rating-svg/lib/scss/rating-label.scss';
```

You can customize the colors and totalSymbols through scss variables:

```scss
$rating-svg-inactive-color: grey !default;
$rating-svg-active-colors: #006400 #9acd32 #ffd700 !default; // list of colors from higher to lower rating
$rating-svg-total-symbols: 5 !default;
```

And the library inlcudes a mixin `ratingSVGSymbols` to create your own `:checked`, `:hover` and `:focus`styles. It creates default css rules to change the symbols colors

```scss
@import 'node_modules/react-rating-svg/lib/scss/utils.scss';

.r-rating-label{
    @include ratingSVGSymbols(
        $total-symbols, // default $rating-svg-total-symbols
        $active-colors, // default $rating-svg-active-colors
        $inactive-color, // default $rating-svg-inactive-color
        $hover-color-fn, // default lighten
        $hover-color-fn-amount // default 7%
    );

    // your own react-rating-labels styles
}
```

## TODO
- [x] ~~readOnly and disabled props~~~
- [x] ~~Add caption to render legend~~~
- [x] ~~Add className prop to attach custom css class~~
- [ ] Fractional values in readOnly and disabled component or as initialValue / value. (Render svg gradient with fractional value linked to svgSymbol).
- [ ] Add steps
- [ ] Make examples suite and publish github page.
- [ ] Compile scss in css file to direct link in project.
- [ ] Add support with other css preprocessors.
- [ ] Enhance readme documentation.

## License
[ISC](https://github.com/samuelsantia/react-rating-svg/blob/master/LICENSE)
