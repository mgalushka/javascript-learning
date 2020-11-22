assert = require('assert');

function funcFactory(value) {
  return () => {
    return value;
  };
}

let parameter = "abc";
const func = funcFactory(parameter);

parameter = "def";
assert.equal(func(), "abc"); // (A)
