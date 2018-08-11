'use strict'

const assert = require('assert')
const {includes, indexOf, insert, push} = require('.')
const isArrayWith = require('is-array-with')

describe('barr', function () {
  describe('#includes()', function () {
    it('should return true if an array has a value', function () {
      assert.strictEqual(includes([1, 2, 3], 2), true)
    })

    it('should return false if an array does not have a value', function () {
      assert.strictEqual(includes([1, 2, 3], 0), false)
    })
  })

  describe('#indexOf()', function () {
    it('should return the index of a value in an array', function () {
      assert.strictEqual(indexOf([1, 2, 3, 4, 5], 2), 1)
    })

    it('should return -1 if a value is not contained in an array', function () {
      assert.strictEqual(indexOf([1, 2, 3, 4, 5], 6), -1)
    })
  })

  describe('#insert()', function () {
    it('should correctly insert element in sorted array', function () {
      const arr = ['a', 'c', 'e']
      insert(arr, 'b')
      assert(isArrayWith(arr, 'a', 'b', 'c', 'e'))
    })

    it('should insert element before equivalents if `multiple` is `first`', function () {
      const arr = ['a', 'b', 'c', 'd', 'e', 'e']
      const {found, index} = insert(arr, 'e', {multiple: 'first'})
      assert.strictEqual(found, true)
      assert.strictEqual(index, 4)
      assert(isArrayWith(arr, 'a', 'b', 'c', 'd', 'e', 'e', 'e'))
    })
  })

  describe('#push()', function () {
    it('should insert element and return new length', function () {
      const arr = ['a', 'c', 'e']
      assert.strictEqual(push(arr, 'b'), 4)
      assert(isArrayWith(arr, 'a', 'b', 'c', 'e'))
    })

    it('should support inserting multiple elements', function () {
      const arr = ['a', 'c', 'e']
      assert.strictEqual(push(arr, 'b', 'd'), 5)
      assert(isArrayWith(arr, 'a', 'b', 'c', 'd', 'e'))
    })
  })
})
