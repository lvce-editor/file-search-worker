import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as FocusPickColorTheme from '../FocusPickColorTheme/FocusPickColorTheme.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'

interface Fn {
  (pick: ProtoVisibleItem): Promise<void>
}

const noop: Fn = async () => {}

const getFn = (id: string): Fn => {
  switch (id) {
    case QuickPickEntryId.ColorTheme:
      return FocusPickColorTheme.focusPick
    default:
      return noop
  }
}

export const focusPick = (id: string, pick: ProtoVisibleItem): Promise<void> => {
  const fn = getFn(id)
  return fn(pick)
}
