import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export const getVisible = (
  provider: QuickPickEntriesModule,
  items: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  icons: readonly string[],
): readonly VisibleItem[] => {
  const setSize = items.length
  const range = items.slice(minLineY, maxLineY)
  const visibleItems = provider.getVisibleItems(range, minLineY, maxLineY, focusedIndex, setSize, icons)
  return visibleItems
}
