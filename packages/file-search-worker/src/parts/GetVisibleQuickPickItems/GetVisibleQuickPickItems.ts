import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export const getVisible = async (
  provider: QuickPickEntriesModule,
  items: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  searchValue: string,
): Promise<readonly VisibleItem[]> => {
  const visible = await provider.getVisibleItems(minLineY, maxLineY, focusedIndex, searchValue)
  return visible
}
