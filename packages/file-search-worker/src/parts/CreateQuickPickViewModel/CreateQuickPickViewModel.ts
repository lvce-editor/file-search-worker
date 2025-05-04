import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetProtoVisibleQuickPickItems from '../GetProtoVisibleQuickPickItems/GetProtoVisibleQuickPickItems.ts'
import * as GetScrollBarSize from '../GetScrollBarSize/GetScrollBarSize.ts'
import * as GetVisibleQuickPickItems from '../GetVisibleQuickPickItems/GetVisibleQuickPickItems.ts'
import * as ScrollBarFunctions from '../RpcId/ScrollBarFunctions/ScrollBarFunctions.ts'

export const createQuickPickViewModel = (oldState: QuickPickState, newState: QuickPickState): QuickPickViewModel => {
  const protoVisibleItems = GetProtoVisibleQuickPickItems.getVisible(newState.items, newState.minLineY, newState.maxLineY, newState.icons)
  const visibleItems = GetVisibleQuickPickItems.getVisible(newState.items.length, protoVisibleItems, newState.minLineY, newState.focusedIndex)
  const oldFocusedIndex = oldState.focusedIndex - oldState.minLineY
  const newFocusedIndex = newState.focusedIndex - newState.minLineY
  const itemCount = newState.items.length
  const { itemHeight, deltaY, finalDeltaY, minimumSliderSize, headerHeight, height } = newState
  const listHeight = GetListHeight.getListHeight(itemCount, itemHeight, height)
  const contentHeight = itemCount * itemHeight
  const scrollBarHeight = GetScrollBarSize.getScrollBarSize(listHeight, contentHeight, minimumSliderSize)
  const scrollBarY = ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, height - headerHeight, scrollBarHeight)
  const roundedScrollBarY = Math.round(scrollBarY)
  return {
    visibleItems,
    value: newState.value,
    cursorOffset: newState.cursorOffset,
    focused: newState.focused,
    height,
    oldFocusedIndex,
    newFocusedIndex,
    uid: newState.uid,
    scrollBarHeight,
    scrollBarTop: roundedScrollBarY,
  }
}
