// @flow

export type ConstantsKeyLocalType = {
  KEY1: string,
  KEY2: string,
}

export type ConstantsLocalType = {
  SOME: ConstantsKeyLocalType,
}

const Constants: ConstantsLocalType = {
  SOME: {
    KEY1: "key1",
    KEY2: "key2",
  }
};

console.log(Constants);

console.log(Object.getOwnPropertyDescriptor(Constants.SOME, "KEY1"));

module.exports = {
  Constants,
}
