import { test, expect } from '@jest/globals'
import { getNewValueInsertLineBreak } from '../src/parts/GetNewValueInsertLineBreak/GetNewValueInsertLineBreak.ts'

test('preserves value and moves cursor to end of selection', () => {
  const result = getNewValueInsertLineBreak('hello world', 0, 5, '')
  expect(result).toEqual({
    newValue: 'hello world',
    cursorOffset: 5,
  })
})

test('handles empty string', () => {
  const result = getNewValueInsertLineBreak('', 0, 0, '')
  expect(result).toEqual({
    newValue: '',
    cursorOffset: 0,
  })
})

test('handles cursor at end', () => {
  const result = getNewValueInsertLineBreak('hello', 5, 5, '')
  expect(result).toEqual({
    newValue: 'hello',
    cursorOffset: 5,
  })
})
