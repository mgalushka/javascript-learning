// @flow

/*
// Write a range function that takes two arguments,
// start and end, and retuen array containing all the numbers
// from start up to (and including) end.
// Next, write a sum function that takes an array of numbers
// and returns thesum of these numbers.
// Run the example program and see whether it does indeed return 55.
*/
const range = (start: number, end: number) => {
  let result: number[] = [];
  if (start > end) {
    return result;
  }
  for (let i=start; i<end; i++) {
    result.push(i);
  }
  return result;
}

const sum = (numbers: number[]) => {
  return numbers.reduce((acc, current) => acc + current, 0);
}

console.log(range(1, 10));
console.log(sum(range(1, 10)));
