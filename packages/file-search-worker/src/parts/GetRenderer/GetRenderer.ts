import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as GetQuickPickItemsVirtualDom from '../GetQuickPickItemsVirtualDom/GetQuickPickItemsVirtualDom.ts'
import * as GetVisibleQuickPickItems from '../GetVisibleQuickPickItems/GetVisibleQuickPickItems.js'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

const renderValue = (oldState: QuickPickState, newState: QuickPickState): any => {
  return [/* method */ RenderMethod.SetValue, /* value */ newState.value]
}

const renderCursorOffset = (oldState: QuickPickState, newState: QuickPickState): any => {
  return [/* method */ RenderMethod.SetCursorOffset, /* cursorOffset */ newState.cursorOffset]
}

const renderItems = (oldState: QuickPickState, newState: QuickPickState): any => {
  const visibleItems = GetVisibleQuickPickItems.getVisible(
    newState.provider,
    newState.items,
    newState.minLineY,
    newState.maxLineY,
    newState.focusedIndex,
  )
  const dom = GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(visibleItems)
  return [/* method */ 'setItemsDom', dom]
}

const renderFocusedIndex = (oldState: QuickPickState, newState: QuickPickState): any => {
  const oldFocusedIndex = oldState.focusedIndex - oldState.minLineY
  const newFocusedIndex = newState.focusedIndex - newState.minLineY
  return [/* method */ RenderMethod.SetFocusedIndex, /* oldFocusedIndex */ oldFocusedIndex, /* newFocusedIndex */ newFocusedIndex]
}

const renderHeight = (oldState: QuickPickState, newState: QuickPickState): any => {
  if (newState.items.length === 0) {
    return [/* method */ RenderMethod.SetItemsHeight, /* height */ newState.itemHeight]
  }
  const maxLineY = Math.min(newState.maxLineY, newState.items.length)
  const itemCount = maxLineY - newState.minLineY
  const height = itemCount * newState.itemHeight
  return [/* method */ RenderMethod.SetItemsHeight, /* height */ height]
}

const renderFocus = (oldState: QuickPickState, newState: QuickPickState): any => {
  const selector = newState.focused ? '.InputBox' : ''
  return ['Viewlet.focusSelector', selector]
}

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderValue:
      return renderValue
    case DiffType.RenderCursorOffset:
      return renderCursorOffset
    case DiffType.RenderItems:
      return renderItems
    case DiffType.RenderFocusedIndex:
      return renderFocusedIndex
    case DiffType.Height:
      return renderHeight
    case DiffType.RenderFocus:
      return renderFocus
    default:
      throw new Error('unknown renderer')
  }
}
