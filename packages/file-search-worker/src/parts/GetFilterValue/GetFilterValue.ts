import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'

interface Fn {
  (value: string): string
}

const noop = (value: string): string => {
  return structuredClone(value)
}

const getFilterValueEverything = (value: string): string => {
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)
  const prefixLength = prefix.length
  return value.slice(prefixLength)
}

const getFn = (id: string): Fn => {
  switch (id) {
    case QuickPickEntryId.EveryThing:
      return getFilterValueEverything
    default:
      return noop
  }
}

export const getFilterValue = (id: string, value: string): string => {
  const fn = getFn(id)
  return fn(value)
}
