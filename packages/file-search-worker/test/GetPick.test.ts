import { expect, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as GetPick from '../src/parts/GetPick/GetPick.ts'

test('returns pick at valid index', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item3', matches: [], uri: '' },
  ]
  const result = GetPick.getPick(items, 1)
  expect(result).toEqual({ description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' })
})

test('returns undefined for index out of bounds', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
  ]
  const result = GetPick.getPick(items, 5)
  expect(result).toBeUndefined()
})

test('throws error if items is not an array', () => {
  expect(() => GetPick.getPick('not an array' as any, 0)).toThrow()
})

test('throws error if index is not a number', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
  ]
  expect(() => GetPick.getPick(items, 'not a number' as any)).toThrow()
})

test('handles empty array', () => {
  const result = GetPick.getPick([], 0)
  expect(result).toBeUndefined()
})

test('returns undefined for negative index', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
  ]
  const result = GetPick.getPick(items, -1)
  expect(result).toBeUndefined()
})
