import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickNoop from '../QuickPickEntriesNoop/QuickPickNoop.ts'

export const state = {
  provider: QuickPickNoop as any,
  prefix: 'string-that-should-never-match-another-string',
}

export const getVisibleItems = (
  picks: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
  icons: readonly string[],
): readonly ProtoVisibleItem[] => {
  const items = picks.map((pick) => pick.pick)
  const visibleItems = state.provider.getVisibleItems(items, minLineY, maxLineY, focusedIndex, setSize, icons)
  return visibleItems
}
