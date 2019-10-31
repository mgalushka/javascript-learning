// @flow

export type TransactionDirection = "BUY" | "SELL";

export type Transaction = {
  index: string,
  date: string,
  amount: number,
  price: number,
  direction: TransactionDirection,
};

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

type HoldingStats = {
  // transactions: Transaction[],
  amount: number,
  totalCost: number,
}

// keep track of Holding
let Holding = () => {
  let stats: Map<string, HoldingStats> = new Map();

  const all = (): Map<string, HoldingStats> => stats;
  const allByIndex = (index: string): ?HoldingStats => stats.get(index);
  const add = (tr: Transaction) => {
    if (!stats.has(tr.index)) {
      stats.set(tr.index, {
          // transactions: [Object.assign(tr)],
          amount: tr.amount,
          totalCost: tr.price * tr.amount,
      });
    } else {
      let current: ?HoldingStats = stats.get(tr.index) ?? null;
      if (current) {
        // current.transactions.push(Object.assign(tr));
        current.amount += tr.amount;
        current.totalCost += tr.price * tr.amount;
      }
    }
  };
  const remove = (tr: Transaction): void => {
    if (stats.has(tr.index)) {
      let current: ?HoldingStats = stats.get(tr.index) ?? null;
      if (
        current &&
        current.amount >= tr.amount &&
        current.totalCost >= tr.price * tr.amount
      ) {
        // current.transactions.push(Object.assign(tr));
        current.amount -= tr.amount;
        current.totalCost -= tr.price * tr.amount;
      }
    }
  };

  return {
    all: all,
    allByIndex: allByIndex,
    add: add,
    remove: remove,
  }
}

let Tracker = (trx: Transaction[]) => {
  const transactions: Transaction[] = copyTransactions(trx);
  const holding = Holding();

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
    holding.add(Object.assign(deletedTrx));
    cleanupDelete(deletedTrx);
    return result;
  }

  const print = (): void => {
    S.forEach((k, v) => console.log(`${v} => ${JSON.stringify([...k])}`));
  }

  const isOpposite = (a: Transaction, b: Transaction): boolean => {
    return a.direction !== b.direction;
  }

  const matchAndAdjust = (tr: Transaction): [Transaction, ?Transaction] => {
    let matched: [Transaction, ?Transaction];

    // -------------------------------
    // Same day matching
    const indexMap = S.get(tr.index) ?? new Map();
    if (indexMap) {

      // same day matching
      const dateArray: Transaction[] = indexMap.get(tr.date) ?? [];
      for (let i = 0; i < dateArray.length; i++) {
        const t: Transaction = dateArray[i];

        // if opposite - matched same day
        if (isOpposite(tr, t)) {
          // same day full matched amount
          if (tr.amount <= t.amount) {
            t.amount -= tr.amount;
            if (t.amount == 0) {
              dateArray.splice(i, 1);
              cleanupDelete(t);
            }
            let matched = Object.assign(t);
            matched.amount = tr.amount;
            return [Object.assign(tr), matched];
          }
          // same day - partial match
          else {
            let matched = Object.assign(t);
            let remaining = Object.assign(t);
            remaining.amount -= tr.amount;
            dateArray.splice(i, 1, remaining);
            return [Object.assign(remaining), Object.assign(t)];
          }
        }
        // not opposite - add to holding
        else {
          holding.add(tr);
        }

      } // same day matching - dateArray loop

      // 30 days rule - bad and breakfasting

      //
    }

    // -------------------------------

    return [Object.assign(tr), null];
  }

  return {
    next: pop,
    matchAndAdjust: matchAndAdjust,
    print: print,
    holding: holding,
  }
}

export type MatchedTransactions = [Transaction, ?Transaction];

// core algorithm
const matching = (): MatchedTransactions[] => {
  const pairs: MatchedTransactions[] = [];
  const T = Tracker(portfolio);
  // T.print();
  let current: ?Transaction = null;
  while (current = T.next()) {
    if (current === null) break;
    // console.log(current);
    T.print();
    const matched = T.matchAndAdjust(current);
    pairs.push(matched);
    console.log(pairs);
  }
  return pairs;
}

const portfolio: Transaction[] = [
  {index: "MSFT", date: "2019-03-01", amount: 12, price: 2.44, direction: "SELL"},
  {index: "MSFT", date: "2019-03-01", amount: 5, price: 2.09, direction: "BUY"},
  {index: "MSFT", date: "2019-03-01", amount: 7, price: 2.22, direction: "BUY"},
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

module.exports = {
    copyTransaction,
    copyTransactions,
    mapByX,
    Tracker,
    matching,
    Holding,
}
