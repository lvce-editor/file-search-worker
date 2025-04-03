import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as GetQuickPickFileIcons from '../GetQuickPickFileIcons/GetQuickPickFileIcons.ts'

export const focusIndex = async (state: QuickPickState, index: number): Promise<QuickPickState> => {
  const { provider, maxVisibleItems, items, minLineY, maxLineY, fileIconCache } = state
  // TODO get types working
  // @ts-ignore
  if (provider.focusPick) {
    // @ts-ignore
    await provider.focusPick(items[index].pick)
  }
  if (index < minLineY + 1) {
    const minLineY = index
    const maxLineY = Math.min(index + maxVisibleItems, items.length - 1)
    const sliced = items.slice(minLineY, maxLineY)
    const { newFileIconCache, icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(provider, sliced, fileIconCache)

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
    const { newFileIconCache, icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(provider, sliced, fileIconCache)

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
  const { newFileIconCache, icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(provider, sliced, fileIconCache)

  return {
    ...state,
    focusedIndex: index,
    fileIconCache: newFileIconCache,
    icons,
  }
}
