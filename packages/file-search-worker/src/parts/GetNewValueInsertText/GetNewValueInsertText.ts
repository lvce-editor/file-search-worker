import type { InputResult } from '../InputResult/InputResult.ts'

export const getNewValueInsertText = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
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
