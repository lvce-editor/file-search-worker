import { expect, test } from '@jest/globals'
import * as RemoveLeadingSlash from '../src/parts/RemoveLeadingSlash/RemoveLeadingSlash.ts'

test('removes leading slash', () => {
  expect(RemoveLeadingSlash.removeLeadingSlash('/test.txt')).toBe('test.txt')
})

test('keeps path without leading slash unchanged', () => {
  expect(RemoveLeadingSlash.removeLeadingSlash('test.txt')).toBe('test.txt')
})

test('handles empty string', () => {
  expect(RemoveLeadingSlash.removeLeadingSlash('')).toBe('')
})

test('handles only slash', () => {
  expect(RemoveLeadingSlash.removeLeadingSlash('/')).toBe('')
})

test('handles multiple slashes', () => {
  expect(RemoveLeadingSlash.removeLeadingSlash('//test.txt')).toBe('/test.txt')
})
