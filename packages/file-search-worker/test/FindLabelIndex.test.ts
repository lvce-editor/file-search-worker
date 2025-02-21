import { expect, test } from '@jest/globals'
import * as FindLabelIndex from '../src/parts/FindLabelIndex/FindLabelIndex.ts'

test('finds index of item with matching label', () => {
  const items = [{ pick: { label: 'first' } }, { pick: { label: 'second' } }, { pick: { label: 'third' } }]
  const result = FindLabelIndex.findLabelIndex(items, 'second')
  expect(result).toBe(1)
})

test('returns -1 when label is not found', () => {
  const items = [{ pick: { label: 'first' } }, { pick: { label: 'second' } }]
  const result = FindLabelIndex.findLabelIndex(items, 'nonexistent')
  expect(result).toBe(-1)
})

test('returns -1 for empty array', () => {
  const items: any[] = []
  const result = FindLabelIndex.findLabelIndex(items, 'test')
  expect(result).toBe(-1)
})

test('finds first occurrence when multiple items have same label', () => {
  const items = [{ pick: { label: 'first' } }, { pick: { label: 'duplicate' } }, { pick: { label: 'duplicate' } }]
  const result = FindLabelIndex.findLabelIndex(items, 'duplicate')
  expect(result).toBe(1)
})

test('handles case-sensitive labels', () => {
  const items = [{ pick: { label: 'Test' } }, { pick: { label: 'test' } }]
  const result = FindLabelIndex.findLabelIndex(items, 'test')
  expect(result).toBe(1)
})
