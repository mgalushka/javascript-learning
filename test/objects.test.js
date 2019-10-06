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
