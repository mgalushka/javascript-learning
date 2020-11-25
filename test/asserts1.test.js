// @flow
const assert = require("assert");

test('Optional chaining', () => {
  let matchResult: ?string = null;
  assert.doesNotThrow(
    () => {
      matchResult?.length ?? 0;
    },
  );
  assert.equal(matchResult, null);
  assert.equal(matchResult?.length ?? 0, 0);
})
