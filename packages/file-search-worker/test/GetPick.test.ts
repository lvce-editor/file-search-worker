import { expect, test } from '@jest/globals'
import * as GetPick from '../src/parts/GetPick/GetPick.ts'

test.skip('returns pick at valid index', () => {
  const items = [{ pick: 'item1' }, { pick: 'item2' }, { pick: 'item3' }]
  // @ts-ignore
  expect(GetPick.getPick(items, 1)).toBe('item2')
})

test.skip('returns undefined for index out of bounds', () => {
  const items = [{ pick: 'item1' }]
  // @ts-ignore
  expect(GetPick.getPick(items, 5)).toBeUndefined()
})

test.skip('throws error if items is not an array', () => {
  expect(() => GetPick.getPick('not an array' as any, 0)).toThrow()
})

test.skip('throws error if index is not a number', () => {
  const items = [{ pick: 'item1' }]
  // @ts-ignore
  expect(() => GetPick.getPick(items, 'not a number' as any)).toThrow()
})

test.skip('handles empty array', () => {
  expect(GetPick.getPick([], 0)).toBeUndefined()
})
