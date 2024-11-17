import { expect, test } from '@jest/globals'
import * as Path from '../src/parts/Path/Path.ts'

test('dirname - root path', () => {
  expect(Path.dirname('/', '/test')).toBe('/')
})

test('dirname - nested path', () => {
  expect(Path.dirname('/', '/test/file.txt')).toBe('/test')
})

test('dirname - multiple levels', () => {
  expect(Path.dirname('/', '/test/subfolder/file.txt')).toBe('/test/subfolder')
})

test('dirname - no separator', () => {
  expect(Path.dirname('/', 'test')).toBe('/')
})

test('dirname - empty path', () => {
  expect(Path.dirname('/', '')).toBe('/')
})

test('dirname - only separator', () => {
  expect(Path.dirname('/', '/')).toBe('/')
})

test('dirname - multiple separators', () => {
  expect(Path.dirname('/', '/test//file.txt')).toBe('/test')
})

test('dirname - with different separator', () => {
  expect(Path.dirname('\\', 'C:\\test\\file.txt')).toBe('C:\\test')
})
