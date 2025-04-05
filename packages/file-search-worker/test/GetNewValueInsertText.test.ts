import { test, expect } from '@jest/globals'
import { getNewValueInsertText } from '../src/parts/GetNewValueInsertText/GetNewValueInsertText.ts'

test('inserts text at end', () => {
  const result = getNewValueInsertText('hello', 5, 5, ' world')
  expect(result).toEqual({
    newValue: 'hello world',
    cursorOffset: 11,
  })
})

test('inserts text in middle', () => {
  const result = getNewValueInsertText('hello world', 5, 5, ' beautiful')
  expect(result).toEqual({
    newValue: 'hello beautiful world',
    cursorOffset: 15,
  })
})

test('replaces selected text', () => {
  const result = getNewValueInsertText('hello world', 0, 5, 'hi')
  expect(result).toEqual({
    newValue: 'hi world',
    cursorOffset: 2,
  })
})
