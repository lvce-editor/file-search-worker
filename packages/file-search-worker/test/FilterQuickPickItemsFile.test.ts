import { test, expect } from '@jest/globals'
import * as FilterQuickPickItemsFile from '../src/parts/FilterQuickPickItemsFile/FilterQuickPickItemsFile.js'

test('filterQuickPickItemsFile returns all files when value is empty', () => {
  const files = ['/path/to/file1.ts', '/path/to/file2.ts']
  const result = FilterQuickPickItemsFile.filterQuickPickItemsFile(files, '')
  expect(result).toHaveLength(2)
  expect(result[0].pick).toBe('/path/to/file1.ts')
  expect(result[1].pick).toBe('/path/to/file2.ts')
})

test('filterQuickPickItemsFile filters files based on basename', () => {
  const files = ['/path/to/file1.ts', '/path/to/file2.ts', '/path/to/other.txt']
  const result = FilterQuickPickItemsFile.filterQuickPickItemsFile(files, 'file')
  expect(result).toHaveLength(2)
  expect(result[0].pick).toBe('/path/to/file1.ts')
  expect(result[1].pick).toBe('/path/to/file2.ts')
})

test('filterQuickPickItemsFile returns empty array when no matches', () => {
  const files = ['/path/to/file1.ts', '/path/to/file2.ts']
  const result = FilterQuickPickItemsFile.filterQuickPickItemsFile(files, 'nonexistent')
  expect(result).toHaveLength(0)
})
