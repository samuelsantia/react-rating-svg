const regex = new RegExp(/\S+(\.scss$)/g);

module.exports = function(babel) {
  return {
    visitor: {
      ImportDeclaration(path) {
        if ( regex.test(path.node.source.value) ) {
          path.remove();
        }
      }
    }
  }
};
