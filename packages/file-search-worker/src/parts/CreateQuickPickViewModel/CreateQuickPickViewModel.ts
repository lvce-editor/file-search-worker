import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as GetVisibleQuickPickItems from '../GetVisibleQuickPickItems/GetVisibleQuickPickItems.ts'

export const createQuickPickViewModel = async (oldState: QuickPickState, newState: QuickPickState): Promise<QuickPickViewModel> => {
  const visibleItems = await GetVisibleQuickPickItems.getVisible(
    newState.provider,
    newState.items,
    newState.minLineY,
    newState.maxLineY,
    newState.focusedIndex,
  )
  const oldFocusedIndex = oldState.focusedIndex - oldState.minLineY
  const newFocusedIndex = newState.focusedIndex - newState.minLineY
  const maxLineY = Math.min(newState.maxLineY, newState.items.length)
  const itemCount = maxLineY - newState.minLineY
  const height = itemCount * newState.itemHeight
  return {
    visibleItems,
    value: newState.value,
    cursorOffset: newState.cursorOffset,
    focused: newState.focused,
    height,
    oldFocusedIndex,
    newFocusedIndex,
    uid: newState.uid,
    renderAllItems: newState.renderAllItems,
  }
}
