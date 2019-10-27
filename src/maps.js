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

const mapByX = (trx: Transaction[], field: string): Map<string, Transaction[]> => {
  return trx.reduce(
    (map: Map<string, Transaction[]>, tr: Transaction) => {
      if (!(field in tr)) return map;
      const key: string = (tr[field]: string);
      if (map.has(key)) {
        let indexArray: Transaction[] = map.get(key) ?? [];
        indexArray.push(tr);
      } else {
        map.set(key, [tr]);
      }
      return map;
    },
    new Map(),
  );
}

let Tracker = (trx: Transaction[]) => {
  const transactions: Transaction[] = copyTransactions(trx);

  const temp = mapByX(transactions, "index");
  let S: Map<string, Map<string, Transaction[]>> = new Map();
  temp.forEach((trx: Transaction[], index: string) => {
    S.set(index, mapByX(trx, "date"));
  });

  const cleanupDelete = (tr: Transaction): void => {
    let mp = S.get(tr.index);
    if (mp){
      let arr = mp.get(tr.date);
      if (arr && arr.length === 0) {
        let indexToClear: ?Map<string, Transaction[]> = S.get(tr.index);
        if (indexToClear) indexToClear.delete(tr.date);
        if (indexToClear && indexToClear.size === 0) {
          S.delete(tr.index);
        }
      }
    }
  }

  const pop = (): ?Transaction => {
    if (S.size === 0) return null;
    const first = S.values().next().value;
    if (!first) return null;
    if (first.size === 0) return null;
    const arr = first.values().next().value;
    if (!arr || arr.length === 0) return null;
    const result: Transaction = arr[0];
    const deletedTrx: Transaction = arr.splice(0, 1)[0];
    cleanupDelete(deletedTrx);
    return result;
  }

  const print = (): void => {
    S.forEach((k, v) => console.log(`${v} => ${JSON.stringify([...k])}`));
  }

  const matchAndAdjust = (tr: Transaction): ?Transaction => {
    return null;
  }

  return {
    next: pop,
    matchAndAdjust: matchAndAdjust,
    print: print,
  }
}

type MatchedTransactions = [Transaction, ?Transaction];

// core algorithm
const matching = (): MatchedTransactions[] => {
  const pairs: MatchedTransactions[] = [];
  const T = Tracker(portfolio);
  T.print();
  let current: ?Transaction = null;
  while (current = T.next()) {
    if (current === null) break;
    console.log(current);
    T.print();
    const matched = T.matchAndAdjust(current);
    if (matched) {
      pairs.push([current, matched]);
    } else {
      pairs.push([current, null]);
    }
  }
  return pairs;
}

const portfolio: Transaction[] = [
  {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
  {index: "MSFT", date: "2019-04-01", amount: 5, price: 2.09, direction: "BUY"},
  {index: "MSFT", date: "2019-05-01", amount: 42, price: 2.22, direction: "BUY"},
  {index: "APPL", date: "2019-03-01", amount: 1, price: 12.06, direction: "BUY"},
  {index: "APPL", date: "2019-11-01", amount: 44, price: 12.08, direction: "SELL"},
];

matching();

const mappedByIndex = mapByX(portfolio, "index");

const copy: Transaction[] = copyTransactions(portfolio);
portfolio.splice(1, 3);
// console.log(`Portfolio:  ${JSON.stringify(portfolio)}`);
// console.log(`Copy:  ${JSON.stringify(copy)}`);


const byIndex = mappedByIndex.get('APPL');
if (byIndex) {
  const deleted = byIndex.splice(0, 2);
  // console.log(`Deleted from Map: ${JSON.stringify(deleted)}`);
}
