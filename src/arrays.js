// @flow

/*
// Write a range function that takes two arguments,
// start and end, and retuen array containing all the numbers
// from start up to (and including) end.
// Next, write a sum function that takes an array of numbers
// and returns thesum of these numbers.
// Run the example program and see whether it does indeed return 55.
*/
const range = (start: number, end: number): number[] => {
  let result: number[] = [];
  if (start > end) {
    return result;
  }
  for (let i=start; i<end; i++) {
    result.push(i);
  }
  return result;
}

const sum = (numbers: number[]): number => {
  return numbers.reduce((acc, current) => acc + current, 0);
}

console.log(range(1, 10));
console.log(sum(range(1, 10)));

/*
 * This takes an array as argument
 * and produces a new array that has the same elements in the inverse order.
 */
const reverseArray = (input: any[]): any[] => {
  let result: any[] = [];
  if (input.length === 0){
    return result;
  }
  for (let i = input.length-1; i >= 0; i--) {
    result.push(input[i]);
  }
  return result;
}

const swap = (array: any[], a: number, b: number): void => {
  if (
    array.length === 0 ||
    a < 0 ||
    b < 0 ||
    a >= array.length ||
    b >= array.length
  ) {
    return;
  }
  let t: typeof array = array[b];
  array[b] = array[a];
  array[a] = t;
}

/*
 * This takes an array as argument
 * and modifies the array given as argument by reversing its elements.
 */
const reverseArrayInPlace = (input: any[]): any[] => {
  if (input.length <= 1){
    return input;
  }
  const mid = input.length / 2;
  for (let i = 0; i < mid; i++) {
    swap(input, i, input.length - i - 1);
  }
  return input;
}

module.exports = {
  range,
  sum,
  reverseArray,
  reverseArrayInPlace
}
