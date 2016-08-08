export default {
  ReactClass: _isReactClass
};

function _isReactClass(props, propName, componentName) {
  const prop = props[propName];

  if ( !prop.prototype || !prop.prototype.isReactComponent ) {
    return new Error(`Prop ${propName} supplied to ${componentName} must be a valid react component`);
  }
}
