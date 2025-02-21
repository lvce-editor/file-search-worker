import { expect, test } from '@jest/globals'
import * as BeforeInput from '../src/parts/BeforeInput/BeforeInput.ts'
import * as InputEventType from '../src/parts/InputEventType/InputEventType.ts'

test('inserts text at end of value', () => {
  const result = BeforeInput.getNewValue('hello', InputEventType.InsertText, ' world', 5, 5)
  expect(result).toEqual({
    newValue: 'hello world',
    cursorOffset: 11,
  })
})

test('inserts text in middle of value', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.InsertText, 'beautiful ', 6, 6)
  expect(result).toEqual({
    newValue: 'hello beautiful world',
    cursorOffset: 15,
  })
})

test('replaces selected text', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.InsertText, 'hi', 0, 5)
  expect(result).toEqual({
    newValue: 'hi world',
    cursorOffset: 2,
  })
})

test('deletes character backward', () => {
  const result = BeforeInput.getNewValue('hello', InputEventType.DeleteContentBackward, '', 5, 5)
  expect(result).toEqual({
    newValue: 'hell',
    cursorOffset: 4,
  })
})

test('deletes selected text backward', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.DeleteContentBackward, '', 5, 11)
  expect(result).toEqual({
    newValue: 'hello',
    cursorOffset: 5,
  })
})

test('deletes character forward', () => {
  const result = BeforeInput.getNewValue('hello', InputEventType.DeleteContentForward, '', 0, 0)
  expect(result).toEqual({
    newValue: 'ello',
    cursorOffset: 0,
  })
})

test('deletes selected text forward', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.DeleteContentForward, '', 0, 5)
  expect(result).toEqual({
    newValue: ' world',
    cursorOffset: 0,
  })
})

test('deletes word backward', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.DeleteWordBackward, '', 11, 11)
  expect(result).toEqual({
    newValue: 'hello ',
    cursorOffset: 6,
  })
})

test('deletes word forward', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.DeleteWordForward, '', 0, 0)
  expect(result).toEqual({
    newValue: ' world',
    cursorOffset: 0,
  })
})

test('handles composition text', () => {
  const result = BeforeInput.getNewValue('hello', InputEventType.InsertCompositionText, ' world', 5, 5)
  expect(result).toEqual({
    newValue: 'hello world',
    cursorOffset: 11,
  })
})

test('handles line break', () => {
  const result = BeforeInput.getNewValue('hello\nworld', InputEventType.InsertLineBreak, '', 5, 5)
  expect(result).toEqual({
    newValue: 'hello\nworld',
    cursorOffset: 5,
  })
})

test('throws error for unsupported input type', () => {
  expect(() => BeforeInput.getNewValue('hello', 'unsupported', '', 0, 0)).toThrow('unsupported input type unsupported')
})
