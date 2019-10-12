// @flow

import type { A } from './define';

const Z: A = {
  value: "testing",
  callFunction: (): void => {
    console.log("Calling function on Z");
  }
}

module.exports = {
  Z,
}
