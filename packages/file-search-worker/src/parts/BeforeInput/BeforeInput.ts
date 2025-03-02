import * as GetNewValueFunction from '../GetNewValueFunction/GetNewValueFunction.ts'

interface Result {
  readonly newValue: string
  readonly cursorOffset: number
}

export const getNewValue = (value: string, inputType: string, data: string, selectionStart: number, selectionEnd: number): Result => {
  const fn = GetNewValueFunction.getNewValueFunction(inputType)
  return fn(value, selectionStart, selectionEnd, data)
}
