// @flow

const constants = require("./values");
import type { SomeConstantsType } from './values_type';

const c = constants.Constants.SOME;
console.log(c);
console.log(typeof c.KEY1);
console.log(c.KEY1);
console.log(typeof c);
console.log(typeof "key1");

let mp: Map<SomeConstantsType, string> = new Map();
mp.set("key1", "");
mp.set("key2", "");
