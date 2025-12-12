import { QuickPickEntryId } from '@lvce-editor/constants'
import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

interface Fn {
  (value: string): string
}

const noop = (value: string): string => {
  return value
}

const getFilterValueEverything = (value: string): string => {
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)
  const prefixLength = prefix.length
  return value.slice(prefixLength).trim()
}

const getValueGoToLine = (value: string): string => {
  if (value.startsWith(QuickPickPrefix.GoToColumn)) {
    return ''
  }
  return value.slice(1)
}

const getFn = (id: number): Fn => {
  switch (id) {
    case QuickPickEntryId.EveryThing:
      return getFilterValueEverything
    case QuickPickEntryId.GoToLine:
      return getValueGoToLine

    default:
      return noop
  }
}

export const getFilterValue = (id: number, subId: number, value: string): string => {
  if (subId === QuickPickEntryId.GoToLine) {
    return getValueGoToLine(value)
  }
  const fn = getFn(id)
  const filterValue = fn(value)
  return filterValue
}
