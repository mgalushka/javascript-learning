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

test('copy transactions test', () => {
  expect(maps.copyTransactions(portfolio)).toEqual(portfolio);
});

test('copy transaction test', () => {
  const t: Transaction =
  {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"};
  const copy: Transaction = maps.copyTransaction(t);
  copy.amount = 100;
  expect(copy.amount).not.toBe(t.amount);
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

test('test Tracker Holding on next', () => {
  const oppositePairsPortfolioSameDay: Transaction[] = [
    {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
    {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.09, direction: "BUY"},
  ];
  let T = maps.Tracker(oppositePairsPortfolioSameDay);
  T.next();
  expect(T.holding.all()).toEqual(new Map());

});

test('test Tracker same day match', () => {
  const oppositePairsPortfolioSameDay: Transaction[] = [
    {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
    {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.09, direction: "BUY"},
  ];
  let T = maps.Tracker(oppositePairsPortfolioSameDay);
  const current: ?Transaction = T.next();
  expect(current).not.toBeNull();
  expect(current).toEqual(
    {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
  );
  if (current) {
    const pair: [Transaction, ?Transaction] | 'SKIP' = T.matchAndAdjust(current);
    expect(pair[1]).not.toBeNull();
    expect(pair[0]).toEqual(
      {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
    );
    expect(pair[1]).toEqual(
      {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.09, direction: "BUY"},
    );
  }
});

test('test complex next() and Tracker with same day match', () => {
  const oppositePairsPortfolioSameDay: Transaction[] = [
    {index: "MSFT", date: "2019-03-01", amount: 4, price: 2.01, direction: "SELL"},
    {index: "MSFT", date: "2019-03-01", amount: 8, price: 2.02, direction: "SELL"},
    {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.03, direction: "BUY"},
  ];
  let T = maps.Tracker(oppositePairsPortfolioSameDay);
  const current: ?Transaction = T.next();
  expect(current).not.toBeNull();
  expect(current).toEqual(
    {index: "MSFT", date: "2019-03-01", amount: 4, price: 2.01, direction: "SELL"},
  );
  if (current) {
    const pair: [Transaction, ?Transaction] | 'SKIP' = T.matchAndAdjust(current);
    expect(pair[1]).not.toBeNull();
    expect(pair[0]).toEqual(
      {index: "MSFT", date: "2019-03-01", amount: 4, price: 2.01, direction: "SELL"},
    );
    expect(pair[1]).toEqual(
      {index: "MSFT", date: "2019-03-01", amount: 4, price: 2.03, direction: "BUY"},
    );
  }

});

test('test Tracker different indexes not matched', () => {
  const notMatched: Transaction[] = [
    {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.11, direction: "SELL"},
    {index: "APPL", date: "2019-03-01", amount: 12, price: 2.12, direction: "BUY"},
  ];
  let T = maps.Tracker(notMatched);
  let current: ?Transaction = T.next();
  expect(current).not.toBeNull();
  expect(current).toEqual(
    {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.11, direction: "SELL"},
  );
  if (current) {
    const pair: [Transaction, ?Transaction] | 'SKIP' = T.matchAndAdjust(current);
    expect(pair[1]).toBeNull();
    expect(pair[0]).toEqual(
      {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.11, direction: "SELL"},
    );
  }
  expect(T.holding.allByIndex('MSFT')).toBeUndefined();

  current = T.next();
  expect(current).not.toBeNull();
  if (current) {
    T.matchAndAdjust(current);
  }
  expect(T.holding.allByIndex('APPL')).toEqual(
    {amount: 12, totalCost: 12 * 2.12},
  );
});
