import { expect, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as FilterQuickPickItems from '../src/parts/FilterQuickPickItems/FilterQuickPickItems.ts'

test('returns all items when value is empty', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/file.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/other.txt', matches: [], uri: '' },
  ]
  const result = FilterQuickPickItems.filterQuickPickItems(items, '')
  expect(result).toEqual([
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/file.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/other.txt', matches: [], uri: '' },
  ])
})

test('filters items based on label match', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'other.txt', matches: [], uri: '' },
  ]
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'file')
  expect(result.length).toBe(1)
  expect(result[0].label).toBe('file.txt')
  expect(result[0].matches.length).toBeGreaterThan(0)
})

test('handles no matches', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/file.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/other.txt', matches: [], uri: '' },
  ]
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'xyz')
  expect(result).toEqual([])
})

test('handles multiple matches', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '' },
  ]
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'file')
  expect(result.length).toBe(2)
  expect(result[0].label).toBe('file1.txt')
  expect(result[1].label).toBe('file2.txt')
  expect(result[0].matches.length).toBeGreaterThan(0)
  expect(result[1].matches.length).toBeGreaterThan(0)
})

test('handles empty items array', () => {
  const items: readonly ProtoVisibleItem[] = []
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'test')
  expect(result).toEqual([])
})

test('handles case insensitive matching', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'File.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'other.txt', matches: [], uri: '' },
  ]
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'file')
  expect(result.length).toBe(1)
  expect(result[0].label).toBe('File.txt')
})
