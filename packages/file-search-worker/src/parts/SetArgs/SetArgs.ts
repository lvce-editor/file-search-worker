import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'

interface Fn {
  (args: readonly any[]): void
}

const noop = (args: readonly any[]): void => {}

const setArgsCustom = (args: readonly any[]): void => {
  state.args = args
}

const getFn = (id: string): Fn => {
  switch (id) {
    case QuickPickEntryId.Custom:
      return setArgsCustom
    default:
      return noop
  }
}

export const setArgs = (id: string, args: readonly any[]): void => {
  const fn = getFn(id)
  return fn(args)
}
