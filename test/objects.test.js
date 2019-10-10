// @flow
const objects = require("../src/objects");

test('salary sum test', () => {
  let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130,
    "Jim Smith": 250,
  };
  expect(objects.salariesSum(salaries)).toEqual(640);
});

test('deep objects comparison', () => {
  let A = {
    field: 3,
    data: "value",
    nested: {
      X: 9
    }
  }
  let B = {
    field: 3,
    data: "value",
    nested: {
      X: 8
    }
  };
  expect(objects.deepEquals(A, B)).toEqual(false);
  Object.assign(B, A);
  expect(objects.deepEquals(A, B)).toEqual(true);

  expect(objects.deepEquals({}, {})).toEqual(true);
  expect(objects.deepEquals({}, {a: 1})).toEqual(false);
  expect(objects.deepEquals({b: 1}, {a: 1})).toEqual(false);
  expect(objects.deepEquals({b: 1, a: 2}, {a: 2, b:1})).toEqual(true);
  expect(objects.deepEquals({b: 1, a: 2, c: [1,2]}, {c: [1,2], a: 2, b:1})).toEqual(true);
  expect(objects.deepEquals({b: 1, a: 2, c: [1,2]}, {c: [1], a: 2, b:1})).toEqual(false);
  expect(objects.deepEquals({b: 1, a: 2, c: [1, undefined]}, {c: [1, undefined], a: 2, b:1})).toEqual(true);
  expect(objects.deepEquals({b: null, a: 2, c: [1, undefined]}, {c: [1, undefined], a: 2, b:undefined})).toEqual(false);
  expect(objects.deepEquals({b: null, a: 2, c: [1, undefined]}, {c: [1, undefined], a: 2, b: null})).toEqual(true);
});

test('typeof', () => {
  expect(typeof null).toEqual("object");
  expect(typeof undefined).toEqual("undefined");
  expect(typeof [1]).toEqual("object");
});

test('test optional', () => {
  expect(objects.callOptional()).toEqual(1);
});
