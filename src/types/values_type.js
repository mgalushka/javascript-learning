// @flow

const constants = require("./values");
import type { ConstantsKeyLocalType } from './values';

export type SomeConstantsType = $Values<ConstantsKeyLocalType>;
