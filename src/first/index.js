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

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// testing function
let schedule = {};
console.log(isEmpty(schedule) === true); // true
schedule["8:30"] = "get up";
console.log(isEmpty(schedule) === false); // false
