import { expect, test } from '@jest/globals'
import * as GetDefaultValue from '../src/parts/GetDefaultValue/GetDefaultValue.ts'

test('returns > for quickPick://everything', () => {
  expect(GetDefaultValue.getDefaultValue('quickPick://everything')).toBe('>')
})

test('returns empty string for unknown uri', () => {
  expect(GetDefaultValue.getDefaultValue('unknown://uri')).toBe('')
})

test('returns empty string for empty uri', () => {
  expect(GetDefaultValue.getDefaultValue('')).toBe('')
})

test('returns empty string for undefined uri', () => {
  // @ts-ignore
  expect(GetDefaultValue.getDefaultValue(undefined)).toBe('')
})
