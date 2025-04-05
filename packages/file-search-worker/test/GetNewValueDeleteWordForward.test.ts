import { test, expect } from '@jest/globals'
import { getNewValueDeleteWordForward } from '../src/parts/GetNewValueDeleteWordForward/GetNewValueDeleteWordForward.ts'

test('deletes word after cursor', () => {
  const result = getNewValueDeleteWordForward('hello world', 0, 0, '')
  expect(result).toEqual({
    newValue: ' world',
    cursorOffset: 0,
  })
})

test('deletes selected text', () => {
  const result = getNewValueDeleteWordForward('hello beautiful world', 6, 15, '')
  expect(result).toEqual({
    newValue: 'hello  world',
    cursorOffset: 6,
  })
})

test('deletes partial word', () => {
  const result = getNewValueDeleteWordForward('hello world', 3, 3, '')
  expect(result).toEqual({
    newValue: 'hel world',
    cursorOffset: 3,
  })
})

test('handles end of string', () => {
  const result = getNewValueDeleteWordForward('hello', 5, 5, '')
  expect(result).toEqual({
    newValue: 'hello',
    cursorOffset: 5,
  })
})
