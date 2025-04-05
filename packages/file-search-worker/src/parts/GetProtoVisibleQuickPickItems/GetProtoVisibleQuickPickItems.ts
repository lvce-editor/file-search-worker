import { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'

export const getVisible = (
  provider: QuickPickEntriesModule,
  items: readonly any[],
  minLineY: number,
  maxLineY: number,
  icons: readonly string[],
): readonly ProtoVisibleItem[] => {
  const range = items.slice(minLineY, maxLineY)
  const protoVisibleItems = provider.getVisibleItems(range, icons)
  return protoVisibleItems
}
