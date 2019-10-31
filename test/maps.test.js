// @flow
const maps = require("../src/maps");

import type { Transaction } from "../src/maps";

const portfolio: Transaction[] = [
  {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
  {index: "MSFT", date: "2019-03-01", amount: 5, price: 2.09, direction: "BUY"},
  {index: "MSFT", date: "2019-03-01", amount: 7, price: 2.22, direction: "BUY"},
  {index: "APPL", date: "2019-03-01", amount: 1, price: 12.06, direction: "BUY"},
  {index: "APPL", date: "2019-11-01", amount: 44, price: 12.08, direction: "SELL"},
];

test('copy', () => {
  expect(maps.copyTransactions(portfolio)).toEqual(portfolio);
});
