import { expect, test } from '@jest/globals'
import * as FilterQuickPickItems from '../src/parts/FilterQuickPickItems/FilterQuickPickItems.ts'

test('returns all items when value is empty', () => {
  const items = ['/test/file.txt', '/test/other.txt']
  const result = FilterQuickPickItems.filterQuickPickItems(items, '')
  expect(result).toEqual([
    { pick: '/test/file.txt', matches: [] },
    { pick: '/test/other.txt', matches: [] },
  ])
})

test('filters items based on basename match', () => {
  const items = ['/test/file.txt', '/test/other.txt']
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'file')
  expect(result).toEqual([{ pick: '/test/file.txt', matches: expect.any(Array) }])
  expect(result[0].matches.length).toBeGreaterThan(0)
})

test('handles no matches', () => {
  const items = ['/test/file.txt', '/test/other.txt']
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'xyz')
  expect(result).toEqual([])
})

test('handles multiple matches', () => {
  const items = ['/test/file.txt', '/test/file2.txt']
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'file')
  expect(result).toEqual([
    { pick: '/test/file.txt', matches: [38, 0, 4] },
    { pick: '/test/file2.txt', matches: [38, 0, 4] },
  ])
})

test('handles empty items array', () => {
  const items: string[] = []
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'test')
  expect(result).toEqual([])
})
