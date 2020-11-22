assert = require('assert');

const divideCallback = (a, b) => {
  return a / b;
}

const dividePromise = async (a, b) => {
  return a / b;
}

test('divideCallback', () => {
  divideCallback(8, 4, (error, result) => {
    if (error) {
      t.end(error);
    } else {
      assert.strictEqual(result, 2);
      t.end();
    }
  });
});

test('dividePromise', () => {
  return dividePromise(8, 4)
  .then(result => {
    assert.strictEqual(result, 2);
  });
});

test('Assign to const', () => {
  const i = 0; // must initialize
  assert.throws(
    () => { i = i + 1 },
    {
      name: 'TypeError',
      message: 'Assignment to constant variable.',
    }
  );
});
