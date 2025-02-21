import { expect, test } from '@jest/globals'
import * as Arrays from '../src/parts/Arrays/Arrays.ts'

test('converts empty async iterable to empty array', async () => {
  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      // Empty iterator
    },
  }
  expect(await Arrays.fromAsync(asyncIterable)).toEqual([])
})

test('converts async iterable with single value', async () => {
  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      yield 'test'
    },
  }
  expect(await Arrays.fromAsync(asyncIterable)).toEqual(['test'])
})

test('converts async iterable with multiple values', async () => {
  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      yield 1
      yield 2
      yield 3
    },
  }
  expect(await Arrays.fromAsync(asyncIterable)).toEqual([1, 2, 3])
})

test('converts async iterable with mixed value types', async () => {
  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      yield 'string'
      yield 42
      yield { key: 'value' }
      yield true
    },
  }
  expect(await Arrays.fromAsync(asyncIterable)).toEqual(['string', 42, { key: 'value' }, true])
})

test('handles async iterable that throws error', async () => {
  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      yield 1
      throw new Error('Iterator error')
    },
  }
  await expect(Arrays.fromAsync(asyncIterable)).rejects.toThrow('Iterator error')
})
