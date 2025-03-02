import * as InputEventType from '../InputEventType/InputEventType.ts'

interface Result {
  readonly newValue: string
  readonly cursorOffset: number
}

const getNewValueInsertText = (value: string, selectionStart: number, selectionEnd: number, data: string): Result => {
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

const getNewValueDeleteContentBackward = (value: string, selectionStart: number, selectionEnd: number, data: string): Result => {
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

const RE_ALPHA_NUMERIC = /[a-z\d]/i

const isAlphaNumeric = (character: string): boolean => {
  return RE_ALPHA_NUMERIC.test(character)
}

const getNewValueDeleteWordBackward = (value: string, selectionStart: number, selectionEnd: number, data: string): Result => {
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

const getNewValueDeleteContentForward = (value: string, selectionStart: number, selectionEnd: number, data: string): Result => {
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

const getNewValueDeleteWordForward = (value: string, selectionStart: number, selectionEnd: number, data: string): Result => {
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

const getNewValueInsertCompositionText = (value: string, selectionStart: number, selectionEnd: number, data: string): Result => {
  return getNewValueInsertText(value, selectionStart, selectionEnd, data)
}

const getNewValueInsertLineBreak = (value: string, selectionStart: number, selectionEnd: number, data: string): Result => {
  return {
    newValue: value,
    cursorOffset: selectionEnd,
  }
}

export const getNewValueFunction = (inputType: string): any => {
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
