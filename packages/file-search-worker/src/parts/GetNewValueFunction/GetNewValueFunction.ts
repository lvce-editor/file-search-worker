import type { InputHandler } from '../InputHandler/InputHandler.ts'
import type { InputResult } from '../InputResult/InputResult.ts'
import * as InputEventType from '../InputEventType/InputEventType.ts'
import { isAlphaNumeric } from '../IsAlphaNumeric/IsAlphaNumeric.ts'

const getNewValueInsertText = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  if (selectionStart === value.length) {
    const newValue = value + data
    return {
      newValue,
      cursorOffset: newValue.length,
    }
  }
  const before = value.slice(0, selectionStart)
  const after = value.slice(selectionEnd)
  const newValue = before + data + after
  return {
    newValue,
    cursorOffset: selectionStart + data.length,
  }
}

const getNewValueDeleteContentBackward = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  const after = value.slice(selectionEnd)
  if (selectionStart === selectionEnd) {
    const before = value.slice(0, selectionStart - 1)
    const newValue = before + after
    return {
      newValue,
      cursorOffset: before.length,
    }
  }
  const before = value.slice(0, selectionStart)
  const newValue = before + after
  return {
    newValue,
    cursorOffset: selectionStart,
  }
}

const getNewValueDeleteWordBackward = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  const after = value.slice(selectionEnd)
  if (selectionStart === selectionEnd) {
    let startIndex = Math.max(selectionStart - 1, 0)
    while (startIndex > 0 && isAlphaNumeric(value[startIndex])) {
      startIndex--
    }
    const before = value.slice(0, startIndex)
    const newValue = before + after
    return {
      newValue,
      cursorOffset: before.length,
    }
  }
  const before = value.slice(0, selectionStart)
  const newValue = before + after
  return {
    newValue,
    cursorOffset: selectionStart,
  }
}

const getNewValueDeleteContentForward = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  const before = value.slice(0, selectionStart)
  if (selectionStart === selectionEnd) {
    const after = value.slice(selectionEnd + 1)
    const newValue = before + after
    return {
      newValue,
      cursorOffset: selectionStart,
    }
  }
  const after = value.slice(selectionEnd)
  const newValue = before + after
  return {
    newValue,
    cursorOffset: selectionStart,
  }
}

const getNewValueDeleteWordForward = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  const before = value.slice(0, selectionStart)
  if (selectionStart === selectionEnd) {
    let startIndex = Math.min(selectionStart + 1, value.length - 1)
    while (startIndex < value.length && isAlphaNumeric(value[startIndex])) {
      startIndex++
    }
    const after = value.slice(startIndex)
    const newValue = before + after
    return {
      newValue,
      cursorOffset: before.length,
    }
  }
  const after = value.slice(selectionEnd)
  const newValue = before + after
  return {
    newValue,
    cursorOffset: selectionStart,
  }
}

const getNewValueInsertCompositionText = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  return getNewValueInsertText(value, selectionStart, selectionEnd, data)
}

const getNewValueInsertLineBreak = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  return {
    newValue: value,
    cursorOffset: selectionEnd,
  }
}

export const getNewValueFunction = (inputType: string): InputHandler => {
  switch (inputType) {
    case InputEventType.InsertFromPaste:
    case InputEventType.InsertText:
      return getNewValueInsertText
    case InputEventType.DeleteContentBackward:
      return getNewValueDeleteContentBackward
    case InputEventType.DeleteContentForward:
      return getNewValueDeleteContentForward
    case InputEventType.DeleteWordForward:
      return getNewValueDeleteWordForward
    case InputEventType.DeleteWordBackward:
      return getNewValueDeleteWordBackward
    case InputEventType.InsertLineBreak:
      return getNewValueInsertLineBreak
    case InputEventType.InsertCompositionText:
      return getNewValueInsertCompositionText
    default:
      throw new Error(`unsupported input type ${inputType}`)
  }
}
