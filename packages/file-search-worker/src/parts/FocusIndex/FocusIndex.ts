import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const focusIndex = async (state: QuickPickState, index: number): Promise<QuickPickState> => {
  const { provider, maxVisibleItems, items, minLineY, maxLineY } = state
  // TODO get types working
  // @ts-ignore
  if (provider.focusPick) {
    // @ts-ignore
    await provider.focusPick(items[index].pick)
  }
  if (index < minLineY + 1) {
    const minLineY = index
    const maxLineY = Math.min(index + maxVisibleItems, items.length - 1)
    // TODO need to scroll up
    return {
      ...state,
      minLineY,
      maxLineY,
      focusedIndex: index,
    }
  }
  if (index >= maxLineY - 1) {
    // TODO need to scroll down
    const maxLineY = index + 1
    const minLineY = Math.max(maxLineY - maxVisibleItems, 0)
    return {
      ...state,
      minLineY,
      maxLineY,
      focusedIndex: index,
    }
  }
  return {
    ...state,
    focusedIndex: index,
  }
}
