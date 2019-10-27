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

const mapByDate = (trx: Transaction[]): Map<string, Transaction[]> => {
  return trx.reduce(
    (map: Map<string, Transaction[]>, tr: Transaction) => {
      if (map.has(tr.date)) {
        let indexArray: Transaction[] = map.get(tr.date) ?? [];
        indexArray.push(tr);
      } else {
        map.set(tr.date, [tr]);
      }
      return map;
    },
    new Map(),
  );
}

let Tracker = (trx: Transaction[]) => {
  const transactions: Transaction[] = copyTransactions(trx);

  const temp = mapByIndex(transactions);
  let S: Map<string, Map<string, Transaction[]>> = new Map();
  temp.forEach((trx: Transaction[], index: string) => {
    if (!S.has(index)) S.set(index, new Map());
    let indexMap = S.get(index);
    if (indexMap) {
      trx.map(t => {
        if (!indexMap.has(t.date)) indexMap.set(t.date, [t]);
        else {
          let dateMap = indexMap.get(t.date)
          if (dateMap) dateMap.push(t);
        }
      });
    }
  });

  const pop = (): ?Transaction => {
    return null;
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
