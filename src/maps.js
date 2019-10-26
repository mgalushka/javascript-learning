// @flow

type Transaction = {
  index: string,
  date: string,
  amount: number
}

const portfolio: Transaction[] = [
  {index: "MSFT", date: "2019-03-01", amount: 12},
  {index: "MSFT", date: "2019-04-01", amount: 5},
  {index: "MSFT", date: "2019-05-01", amount: 42},
  {index: "APPL", date: "2019-03-01", amount: 1},
  {index: "APPL", date: "2019-11-01", amount: 43},
];

const mappedByIndex: Map<string, Transaction[]> = portfolio.reduce(
  (map: Map<string, Transaction[]>, tr: Transaction) => {
    if (map.has(tr.index)) {
      let indexArray: Transaction[] = map.get(tr.index) ?? [];
      indexArray.push(tr);
    } else {
      map.set(tr.index, [tr]);
    }
    return map;
  },
  new Map(),
);

console.log(mappedByIndex);
const byIndex = mappedByIndex.get('APPL');
if (byIndex) {
  const deleted = byIndex.splice(0, 2);
  console.log(`Deleted from Map: ${JSON.stringify(deleted)}`);
}

portfolio.splice(2, 2);

console.log(mappedByIndex);
