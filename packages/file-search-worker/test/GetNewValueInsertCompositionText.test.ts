import { test, expect } from '@jest/globals'
import { getNewValueInsertCompositionText } from '../src/parts/GetNewValueInsertCompositionText/GetNewValueInsertCompositionText.ts'

test('inserts composition text at end', () => {
  const result = getNewValueInsertCompositionText('hello', 5, 5, ' 世界')
  expect(result).toEqual({
    newValue: 'hello 世界',
    cursorOffset: 8,
  })
})

test('inserts composition text in middle', () => {
  const result = getNewValueInsertCompositionText('hello world', 5, 5, ' 美丽的')
  expect(result).toEqual({
    newValue: 'hello 美丽的 world',
    cursorOffset: 9,
  })
})

test('replaces selected text with composition', () => {
  const result = getNewValueInsertCompositionText('hello world', 0, 5, '你好')
  expect(result).toEqual({
    newValue: '你好 world',
    cursorOffset: 2,
  })
})
