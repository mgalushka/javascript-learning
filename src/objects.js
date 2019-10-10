// @flow

// 1. Write the code, one line for each action:
//
// Create an empty object user.
// Add the property name with the value John.
// Add the property surname with the value Smith.
// Change the value of the name to Pete.
// Remove the property name from the object.

const arrays = require("./arrays");

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

const deepEquals = (a: Object, b: Object): boolean => {
  let aKeys = Object.keys(a);
  let bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (let key of aKeys) {
    if (!(key in b)) {
      console.log(`${key} is missing in B`);
      return false;
    }
    const aValue = a[key];
    const bValue = b[key];
    if (aValue === undefined || aValue === null || typeof aValue != "object") {
      const primitive = primitiveEquals(aValue, bValue);
      if (!primitive) return false;
      else {
        continue;
      }
    }

    // nested array or nested object
    if (typeof aValue == "object") {
      console.log("typeof aValue == object");
      if ("length" in aValue) {
        console.log("length in aValue");
        if (bValue === null || !("length" in bValue)) {
          console.log(`bValue === null OR "length" NOT in bValue(${bValue})`);
          return false;
        } else {
          if (aValue.length !== bValue.length) {
            console.log(
              `aValue.length(${aValue.length})
              !== bValue.length(${bValue.length})`
            );
            return false;
          }
          for (let index = 0; index < aValue.length; index++) {
            if (
              aValue[index] === undefined ||
              aValue[index] === null ||
              typeof aValue[index] != "object"
            ) {
              const primitive = primitiveEquals(aValue[index], bValue[index]);
              if (!primitive) return false;
            } else {
              return deepEquals(aValue[index], bValue[index]);
            }
          }
        }
      } else {
        console.log("deepEquals");
        return deepEquals(aValue, bValue);
      }
    }
  }
  return true;
}

const primitiveEquals = (a: any, b: any): boolean => {
  if (a !== b) {
    console.log(`Primitive a(${a}) !== b(${b})`);
    return false;
  }
  console.log(`Primitive a(${a}) === b(${b})`);
  return true;
}

let rabbit = {};  // object
rabbit.speak = (line: string): void => {
  console.log(`The rabbit says '${line}'`);
}

rabbit.speak("Wow!");

let squirrel = {
  jump: (): void => {
    console.log("Squirrel just jumped!");
  }
};  // object

squirrel.jump();  // https://jsfiddle.net/mgalushka/zjv3prk9/1/


const callOptional = (): number => {
  const object: {value: number, version?: number} = {
    value: 7,
    version: undefined
  };
  return object?.version ?? 1;
}

const callOptional2 = (): ?number => {
  const object: {value: number, version?: number} = {
    value: 7
  };
  return object?.version;
}

module.exports = {
  isEmpty,
  salariesSum,
  deepEquals,
  callOptional,
  callOptional2
}
