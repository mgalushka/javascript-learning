// @flow

type TransactionDirection = "BUY" | "SELL";

type Transaction = {
  index: string,
  date: string,
  amount: number,
  price: number,
  direction: TransactionDirection,
}

const copyTransaction = (tr: Transaction): Transaction => Object.assign(tr);
const copyTransactions = (trx: Transaction[]): Transaction[] =>
  trx.map(t => copyTransaction(t));

let Tracker = {

}

const portfolio: Transaction[] = [
  {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
  {index: "MSFT", date: "2019-04-01", amount: 5, price: 2.09, direction: "BUY"},
  {index: "MSFT", date: "2019-05-01", amount: 42, price: 2.22, direction: "BUY"},
  {index: "APPL", date: "2019-03-01", amount: 1, price: 12.06, direction: "BUY"},
  {index: "APPL", date: "2019-11-01", amount: 44, price: 12.08, direction: "SELL"},
];

const mapByIndex = (trx: Transaction[]): Map<string, Transaction[]> => {
  return trx.reduce(
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
}

const mappedByIndex = mapByIndex(portfolio);

const copy: Transaction[] = copyTransactions(portfolio);
portfolio.splice(1, 3);
console.log(`Portfolio:  ${JSON.stringify(portfolio)}`);
console.log(`Copy:  ${JSON.stringify(copy)}`);


const byIndex = mappedByIndex.get('APPL');
if (byIndex) {
  const deleted = byIndex.splice(0, 2);
  console.log(`Deleted from Map: ${JSON.stringify(deleted)}`);
}
