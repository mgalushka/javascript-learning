# javascript-learning
My learning experience of javascript language.

This code is based on exercises from javascript.info and
"Eloquent JavaScript" book by Marijn Haverbeke.

How to run script:
```
yarn run babel-node src/arrays.js
```

How to monitor flow via `flow-watch`: this will constantly monitor code for
flow errors
```
yarn run flow-watch
```

How to run jest tests on every change:
```
yarn run jest --watchAll
```

# Setup instructions

To create new javascript template project with babel support,
flow typing and jest tests - use these yarn modules:
```
yarn add --dev @babel/core @babel/cli @babel/preset-flow
yarn add --dev @babel/node
yarn add --dev jest
yarn add --dev babel-jest babel-plugin-transform-flow-strip-types
```


What's the right way to write Jest tests verified with Flow?
https://stackoverflow.com/a/50805762/2075157
1. Check jest version
```
npx jest -v
```

2. Install flow-typed
```
npx flow-typed install jest@24.9.0
```

3. Add flow-typed in .flowconfig file
```
...
[libs]
flow-typed
...
```
