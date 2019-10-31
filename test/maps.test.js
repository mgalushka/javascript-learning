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

const oppositePairsPortfolioSameDay: Transaction[] = [
  {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
  {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.09, direction: "BUY"},
];

test('copy transactions test', () => {
  expect(maps.copyTransactions(portfolio)).toEqual(portfolio);
});

test('test mapByIndex', () => {
  expect(maps.mapByX(portfolio, 'index').get('MSFT')).toEqual(
    expect.arrayContaining([
      {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
      {index: "MSFT", date: "2019-03-01", amount: 5, price: 2.09, direction: "BUY"},
      {index: "MSFT", date: "2019-03-01", amount: 7, price: 2.22, direction: "BUY"},
    ]
  ));
});

test('test mapByDate', () => {
  expect(maps.mapByX(portfolio, 'date').get('2019-03-01')).toEqual(
    expect.arrayContaining([
      {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
      {index: "MSFT", date: "2019-03-01", amount: 5, price: 2.09, direction: "BUY"},
      {index: "MSFT", date: "2019-03-01", amount: 7, price: 2.22, direction: "BUY"},
      {index: "APPL", date: "2019-03-01", amount: 1, price: 12.06, direction: "BUY"},
    ]
  ));
});

test('test Tracker next exchausiton', () => {
  let T = maps.Tracker(portfolio);
  for(let i=0; i<5; i++) {
    const N = T.next();
    expect(N).not.toBeNull();
  }
  expect(T.next()).toBeNull();
  expect(T.next()).toBeNull();
  expect(T.next()).toBeNull();
});

test('test Tracker same day match', () => {
  let T = maps.Tracker(oppositePairsPortfolioSameDay);
  const current: ?Transaction = T.next();
  expect(current).not.toBeNull();
  expect(current).toEqual(
    {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
  );
  if (current) {
    const pair: [Transaction, ?Transaction] = T.matchAndAdjust(current);
    expect(pair[1]).not.toBeNull();
    expect(pair[0]).toEqual(
      {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
    );
    expect(pair[1]).toEqual(
      {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.09, direction: "BUY"},
    );
  }
});
