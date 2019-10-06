// @flow
const arrays = require("../src/arrays");

test('arrays range', () => {
  const range0: number[] = arrays.range(1, 10);
  expect(range0).not.toBeNull();
  expect(range0).not.toBeUndefined();
  expect(range0.length).toEqual(9);
});

test('arrays sum', () => {
  const range1: number[] = [1, 3, 5];
  const sum0: number = arrays.sum(range1);
  expect(sum0).toEqual(9);
});

test('arrays reverse', () => {
  expect(arrays.reverseArray([])).toEqual([]);

  const input: number[] = [1, 3, 5];
  const reversed: number[] = arrays.reverseArray(input);
  expect(reversed.length).toEqual(3);
  expect(reversed).toEqual([5, 3, 1]);

});
