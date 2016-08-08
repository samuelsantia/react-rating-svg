const testContext = require.context('./test', true, /-test\.js$/);
testContext.keys().forEach(testContext);
