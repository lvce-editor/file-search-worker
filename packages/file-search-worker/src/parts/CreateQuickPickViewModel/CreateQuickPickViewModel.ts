import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetProtoVisibleQuickPickItems from '../GetProtoVisibleQuickPickItems/GetProtoVisibleQuickPickItems.ts'
import * as GetScrollBarSize from '../GetScrollBarSize/GetScrollBarSize.ts'
import * as GetVisibleQuickPickItems from '../GetVisibleQuickPickItems/GetVisibleQuickPickItems.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export const createQuickPickViewModel = (oldState: QuickPickState, newState: QuickPickState): QuickPickViewModel => {
  const protoVisibleItems = GetProtoVisibleQuickPickItems.getVisible(newState.items, newState.minLineY, newState.maxLineY, newState.icons)
  const visibleItems = GetVisibleQuickPickItems.getVisible(newState.items.length, protoVisibleItems, newState.minLineY, newState.focusedIndex)
  const oldFocusedIndex = oldState.focusedIndex - oldState.minLineY
  const newFocusedIndex = newState.focusedIndex - newState.minLineY
  const itemCount = newState.items.length
  const { deltaY, finalDeltaY, headerHeight, height, itemHeight, minimumSliderSize } = newState
  const listHeight = GetListHeight.getListHeight(itemCount, itemHeight, height)
  const contentHeight = itemCount * itemHeight
  const scrollBarHeight = GetScrollBarSize.getScrollBarSize(listHeight, contentHeight, minimumSliderSize)
  const scrollBarY = ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, height - headerHeight, scrollBarHeight)
  const roundedScrollBarY = Math.round(scrollBarY)
  return {
    cursorOffset: newState.cursorOffset,
    focused: newState.focused,
    height,
    newFocusedIndex,
    oldFocusedIndex,
    scrollBarHeight,
    scrollBarTop: roundedScrollBarY,
    uid: newState.uid,
    value: newState.value,
    visibleItems,
  }
}
