import { expect, test } from '@jest/globals'
import * as GetContentType from '../src/parts/GetContentType/GetContentType.ts'

test('png', () => {
  const uri = '/test/file.png'
  expect(GetContentType.getContentType(uri)).toBe('image/png')
})

test('svg', () => {
  const uri = '/test/file.svg'
  expect(GetContentType.getContentType(uri)).toBe('image/svg+xml')
})

test('other', () => {
  const uri = '/test/file.txt'
  expect(GetContentType.getContentType(uri)).toBe('')
})
