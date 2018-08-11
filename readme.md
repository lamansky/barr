# barr

A collection of [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) functions for sorted arrays.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i barr
```

## API

The module exports an object with four function methods.

### `includes (arr, value, [options])`

#### Parameters

1. `arr` (array): The sorted array which may or may not contain `value`.
2. `value` (any): The value to look for in `arr`.
3. Optional: Object argument:
    * `compare` (function, array, or any): Specifies how array elements will be compared:
        * If a function: When passed two arguments `a` and `b`, expected to return `-1` if `a` is less than `b`, `1` if `a` is greater than `b`, and `0` if they are equal.
        * If an array: An array of Map/object keys, the values of which can be used to compare Maps/objects in the array. Comparison is first performed using the key in the first array element of `compare`. If any two Map/object elements in `arr` have values for that key that are equal, the next key in the `compare` array is used, and so on. If any given element in a `compare` array is itself an array, it is interpreted as a nested keychain.
        * Otherwise: A single Map/object key.
        * If omitted: Will compare numbers and strings. Will coerce everything else into strings.

#### Return Value

Returns `true` if `arr` contains an element that `compare` says is sort-equivalent to `value`.

#### Example

```javascript
const {includes} = require('barr')

includes([1, 2, 3], 2) // true
```

### `indexOf (arr, value, [options])`

#### Parameters

1. `arr` (array): The sorted array which may or may not contain `value`.
2. `value` (any): The value to look for in `arr`.
3. Optional: Object argument:
    * `compare` (function, array, or any): Specifies how array elements will be compared. Refer above to this option’s definition under the documentation for `includes`.
    * Optional: `multiple` (string): Specifies behavior in the event that more than one existing array element is sort-equivalent with `value`. If set to `first` or `last`, the index of the first or last sort-equivalent element (respectively) will be returned. (Note that this will slow down the seek operation.) Otherwise, the index of whatever sort-equivalent item the algorithm comes across first will be returned.

#### Return Value

Returns the integer index if one is found; otherwise returns `-1`.

### `insert (arr, value, [options])`

#### Parameters

1. `arr` (array): The array into which to insert `value`.
2. `value` (any): The value to insert into `arr`.
3. Optional: Object argument:
    * `compare` (function, array, or any): Specifies how array elements will be compared. Refer above to this option’s definition under the documentation for `includes`.
    * Optional: `multiple` (string): Only applies if `unique` is `false` or undefined. Specifies behavior in the event that more than one existing array element is sort-equivalent with `value`. If set to `first` or `last`, then `value` will be inserted before/after the first/last sort-equivalent element, respectively. (This will slow down the insert operation.) Otherwise, `value` will be inserted anywhere in the range of sort-equivalent items.
    * `unique` (bool): If set to `true`, then no item in the collection may be sort-equivalent with another; so if an existing item is sort-equivalent with `value`, it will be overwritten. If set to `false`, multiple sort-equivalent items are allowed, so `value` will always be inserted. Defaults to `false`.

#### Return Value

Returns an object:

* `found` (boolean): `true` if `compare` reported that `arr` already contains a value with the same sort value as `value`; `false` otherwise.
* `index` (positive integer): The index in `arr` at which `value` was inserted.

#### Example

```javascript
const {insert} = require('barr')

const arr = ['a', 'c', 'e']

insert(arr, 'b') // {found: false, index: 1}
arr // ['a', 'b', 'c', 'e']

insert(arr, 'd') // {found: false, index: 3}
arr // ['a', 'b', 'c', 'd', 'e']

insert(arr, 'e', {multiple: 'last'}) // {found: true, index: 5}
arr // ['a', 'b', 'c', 'd', 'e', 'e']
    //             inserted here--^

insert(arr, 'e', {multiple: 'first'}) // {found: true, index: 4}
arr // ['a', 'b', 'c', 'd', 'e', 'e', 'e']
    //        inserted here--^
```

### `push (arr, ...values)`

#### Parameters

1. `arr` (array): The array into which to insert `value`.
2. Variadic: `values` (one or more of: any): The values to insert into `arr`.

#### Return Value

Returns the new length of `arr`.

#### Example

```javascript
const {push} = require('barr')

const arr = ['a', 'c', 'e']

push(arr, 'b', 'd') // 5
arr // ['a', 'b', 'c', 'd', 'e']
```

## Related

This module is part of the “b” family of binary search modules.

* [bfind](https://github.com/lamansky/bfind)
* [binsert](https://github.com/lamansky/binsert)
