import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as GetIconRequests from '../GetIconRequests/GetIconRequests.ts'
import * as GetPickDescription from '../GetPickDescription/GetPickDescription.ts'
import * as RequestFileIcons from '../RequestFileIcons/RequestFileIcons.ts'

export const getVisible = async (
  provider: QuickPickEntriesModule,
  items: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
): Promise<readonly VisibleItem[]> => {
  const visibleItems = []
  const setSize = items.length
  const max = Math.min(setSize, maxLineY)
  const iconsRequests = GetIconRequests.getIconRequests(items.slice(minLineY, maxLineY), provider)
  const icons = await RequestFileIcons.requestFileIcons(iconsRequests)
  let iconIndex = 0
  for (let i = minLineY; i < max; i++) {
    const item = items[i]
    const pick = item.pick
    const label = provider.getPickLabel(pick)
    const description = GetPickDescription.getPickDescription(provider, pick)
    const icon = provider.getPickIcon(pick)
    const fileIcon = icons[iconIndex++]
    visibleItems.push({
      label,
      description,
      icon,
      fileIcon,
      posInSet: i + 1,
      setSize,
      isActive: i === focusedIndex,
      matches: item.matches,
    })
  }
  return visibleItems
}
