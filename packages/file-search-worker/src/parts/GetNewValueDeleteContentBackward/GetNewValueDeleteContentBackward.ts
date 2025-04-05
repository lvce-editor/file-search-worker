import type { InputResult } from '../InputResult/InputResult.ts'

export const getNewValueDeleteContentBackward = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
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
