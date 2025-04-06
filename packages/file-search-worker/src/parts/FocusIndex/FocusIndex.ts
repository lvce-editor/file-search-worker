import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as FocusPick from '../FocusPick/FocusPick.ts'
import * as GetQuickPickFileIcons from '../GetQuickPickFileIcons/GetQuickPickFileIcons.ts'

export const focusIndex = async (state: QuickPickState, index: number): Promise<QuickPickState> => {
  const { uri, maxVisibleItems, items, minLineY, maxLineY, fileIconCache } = state
  await FocusPick.focusPick(uri, items[index])

  if (index < minLineY + 1) {
    const minLineY = index
    const maxLineY = Math.min(index + maxVisibleItems, items.length - 1)
    const sliced = items.slice(minLineY, maxLineY)
    const { newFileIconCache, icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(sliced, fileIconCache)

    // TODO need to scroll up
    return {
      ...state,
      minLineY,
      maxLineY,
      focusedIndex: index,
      icons,
      fileIconCache: newFileIconCache,
    }
  }
  if (index >= maxLineY - 1) {
    // TODO need to scroll down
    const maxLineY = index + 1
    const minLineY = Math.max(maxLineY - maxVisibleItems, 0)
    const sliced = items.slice(minLineY, maxLineY)
    const { newFileIconCache, icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(sliced, fileIconCache)

    return {
      ...state,
      minLineY,
      maxLineY,
      focusedIndex: index,
      fileIconCache: newFileIconCache,
      icons,
    }
  }

  const sliced = items.slice(minLineY, maxLineY)
  const { newFileIconCache, icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(sliced, fileIconCache)

  return {
    ...state,
    focusedIndex: index,
    fileIconCache: newFileIconCache,
    icons,
  }
}
