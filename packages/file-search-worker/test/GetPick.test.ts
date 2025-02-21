import { expect, test } from '@jest/globals'
import * as GetPick from '../src/parts/GetPick/GetPick.ts'

test('returns pick at valid index', () => {
  const items = [{ pick: 'item1' }, { pick: 'item2' }, { pick: 'item3' }]
  expect(GetPick.getPick(items, 1)).toBe('item2')
})

test('returns undefined for index out of bounds', () => {
  const items = [{ pick: 'item1' }]
  expect(GetPick.getPick(items, 5)).toBeUndefined()
})

test('throws error if items is not an array', () => {
  expect(() => GetPick.getPick('not an array' as any, 0)).toThrow()
})

test('throws error if index is not a number', () => {
  const items = [{ pick: 'item1' }]
  expect(() => GetPick.getPick(items, 'not a number' as any)).toThrow()
})

test('handles empty array', () => {
  expect(GetPick.getPick([], 0)).toBeUndefined()
})
