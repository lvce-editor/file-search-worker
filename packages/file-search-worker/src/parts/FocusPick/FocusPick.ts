import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as FocusPickColorTheme from '../FocusPickColorTheme/FocusPickColorTheme.ts'
import { QuickPickEntryId } from '@lvce-editor/constants'

interface Fn {
  (pick: ProtoVisibleItem): Promise<void>
}

const noop: Fn = async () => {}

const getFn = (id: number): Fn => {
  switch (id) {
    case QuickPickEntryId.ColorTheme:
      return FocusPickColorTheme.focusPick
    default:
      return noop
  }
}

export const focusPick = (id: number, pick: ProtoVisibleItem): Promise<void> => {
  const fn = getFn(id)
  return fn(pick)
}
