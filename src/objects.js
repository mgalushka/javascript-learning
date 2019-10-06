// @flow

// 1. Write the code, one line for each action:
//
// Create an empty object user.
// Add the property name with the value John.
// Add the property surname with the value Smith.
// Change the value of the name to Pete.
// Remove the property name from the object.

let user = {};
console.log(user);

user.name = "John";
console.log(user);

user.surname = "Smith";
console.log(user);

user.name = "Pete";
console.log(user);

delete user.name;
console.log(user);

// 2. Write the function isEmpty(obj) which returns true
// if the object has no properties, false otherwise.

const isEmpty = (obj: Object): boolean => {
  return Object.keys(obj).length === 0;
}

// testing function
let schedule = {};
console.log(isEmpty(schedule) === true); // true
schedule["8:30"] = "get up";
console.log(isEmpty(schedule) === false); // false


// 3. Is it possible to change an object declared with const? What do you think?

const user2 = {
  name: "John"
};

// does it work? Yes
user2.name = "Pete";


// 4. We have an object storing salaries of our team:

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
  "Jim Smith": 250,
}

// Write the code to sum all salaries and store in the variable sum.
// Should be 390 in the example above.

// If salaries is empty, then the result must be 0.
const salariesSum = (salaries: Object): number => {
  return Object.keys(salaries).reduce(
    (acc, current) => acc + salaries[current],
    0);
}

// Property flags
// https://javascript.info/property-descriptors#property-flags
let descriptor = Object.getOwnPropertyDescriptor(salaries, "John");
console.log(descriptor);

module.exports = {
  isEmpty,
  salariesSum
}
