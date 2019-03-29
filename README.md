# webassembly-types

> Better types for interacting with WebAssembly

## Install

Using npm:

```sh
npm install --save webassembly-types
```

or using yarn:

```sh
yarn add webassembly-types
```

## Usage

API:
```js
const types = require("webassembly-types");

types.i32(12);
types.i64(12);
const a = types.i64(12n);

// call an export
instance.exports.fn(a);
```

## Why

### stricter range checks

To be consistent with JavaScript, out-of-range numbers passed in WebAssembly do silently overflow.
This can be pretty error-prone, as shown by the following example:

```wast
(module
  (memory 1)
  (func (export "load") (param i32) (result i32)
    (get_local 0)
    (i32.load)
  )
)
```

```js
instance.exports.load(4294967296);
```

Will load at offset 0 because it overflowed at the Wasm boundary.

Using the i32 from this lib will make it throw instead.

### simpler i64

In JavaScript BigInt are not convertible to Number, this can be annoying when trying to keep your JavaScript<>Wasm code generic.

For instance, the previous example could be compiled for both 32-bit and 64-bit address space. In 64-bit mode is would look like the following:

```wast
(module
  (memory 1)
  (func (export "load") (param i64) (result i64)
    (get_local 0)
    (i64.load)
  )
)
```

The call here, wouldn't work anymore (it will throw instead):
```js
instance.exports.load(4294967296);
```

Using the lib:
```js
instance.exports.load(i64(4294967296));
```
