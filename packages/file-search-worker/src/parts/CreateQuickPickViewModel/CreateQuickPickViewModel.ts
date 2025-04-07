import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as GetProtoVisibleQuickPickItems from '../GetProtoVisibleQuickPickItems/GetProtoVisibleQuickPickItems.ts'
import * as GetVisibleQuickPickItems from '../GetVisibleQuickPickItems/GetVisibleQuickPickItems.ts'

export const createQuickPickViewModel = (oldState: QuickPickState, newState: QuickPickState): QuickPickViewModel => {
  const protoVisibleItems = GetProtoVisibleQuickPickItems.getVisible(newState.items, newState.minLineY, newState.maxLineY, newState.icons)
  const visibleItems = GetVisibleQuickPickItems.getVisible(newState.items.length, protoVisibleItems, newState.minLineY, newState.focusedIndex)
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
    totalItems: newState.items.length,
  }
}
