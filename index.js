'use strict'

const bfind = require('bfind')
const binsert = require('binsert')
const sbo = require('sbo')

function includes (...args) {
  return indexOf(...args) !== -1
}

function indexOf (arr, value, opt = {}) {
  const {found, index} = bfind({...opt, get: i => arr[i], length: arr.length, value})
  return found ? index : -1
}

function insert (arr, value, options = {}) {
  return binsert({
    ...options,
    get: i => arr[i],
    insert: i => { arr.splice(i, 0, value) },
    length: arr.length,
    set: i => { arr[i] = value },
    value,
  })
}

function push (arr, ...values) {
  for (const value of values) insert(arr, value)
  return arr.length
}

module.exports = {
  includes: sbo(includes),
  indexOf: sbo(indexOf),
  insert: sbo(insert),
  push: sbo(push),
}
