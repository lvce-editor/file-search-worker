import { test, expect } from '@jest/globals'
import { getNewValueDeleteWordBackward } from '../src/parts/GetNewValueDeleteWordBackward/GetNewValueDeleteWordBackward.ts'

test('deletes word before cursor', () => {
  const result = getNewValueDeleteWordBackward('hello world', 11, 11, '')
  expect(result).toEqual({
    newValue: 'hello',
    cursorOffset: 5,
  })
})

test('deletes selected text', () => {
  const result = getNewValueDeleteWordBackward('hello beautiful world', 6, 15, '')
  expect(result).toEqual({
    newValue: 'hello  world',
    cursorOffset: 6,
  })
})

test('deletes partial word', () => {
  const result = getNewValueDeleteWordBackward('hello world', 8, 8, '')
  expect(result).toEqual({
    newValue: 'hellorld',
    cursorOffset: 5,
  })
})

test('handles empty string', () => {
  const result = getNewValueDeleteWordBackward('', 0, 0, '')
  expect(result).toEqual({
    newValue: '',
    cursorOffset: 0,
  })
})
