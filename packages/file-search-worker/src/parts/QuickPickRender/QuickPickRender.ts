import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as GetQuickPickItemsVirtualDom from '../GetQuickPickItemsVirtualDom/GetQuickPickItemsVirtualDom.ts'
import * as GetVisibleQuickPickItems from '../GetVisibleQuickPickItems/GetVisibleQuickPickItems.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const hasFunctionalRender = true

const renderValue = {
  isEqual(oldState: QuickPickState, newState: QuickPickState): boolean {
    return newState.inputSource === InputSource.User || oldState.value === newState.value
  },
  apply(oldState: QuickPickState, newState: QuickPickState): any[] {
    return [/* method */ RenderMethod.SetValue, /* value */ newState.value]
  },
}

const renderCursorOffset = {
  isEqual(oldState: QuickPickState, newState: QuickPickState): boolean {
    return (
      newState.inputSource === InputSource.User || oldState.cursorOffset === newState.cursorOffset || newState.cursorOffset === newState.value.length
    )
  },
  apply(oldState: QuickPickState, newState: QuickPickState): any[] {
    return [/* method */ RenderMethod.SetCursorOffset, /* cursorOffset */ newState.cursorOffset]
  },
}

const renderItems = {
  isEqual(oldState: QuickPickState, newState: QuickPickState): boolean {
    return (
      oldState.items === newState.items &&
      oldState.minLineY === newState.minLineY &&
      oldState.maxLineY === newState.maxLineY &&
      oldState.focusedIndex === newState.focusedIndex
    )
  },
  apply(oldState: QuickPickState, newState: QuickPickState): any[] {
    const visibleItems = GetVisibleQuickPickItems.getVisible(
      newState.provider,
      newState.items,
      newState.minLineY,
      newState.maxLineY,
      newState.focusedIndex,
    )
    const dom = GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(visibleItems)
    return [/* method */ 'setItemsDom', dom]
  },
}

const renderFocusedIndex = {
  isEqual(oldState: QuickPickState, newState: QuickPickState): boolean {
    return oldState.focusedIndex === newState.focusedIndex
  },
  apply(oldState: QuickPickState, newState: QuickPickState): any[] {
    const oldFocusedIndex = oldState.focusedIndex - oldState.minLineY
    const newFocusedIndex = newState.focusedIndex - newState.minLineY
    return [/* method */ RenderMethod.SetFocusedIndex, /* oldFocusedIndex */ oldFocusedIndex, /* newFocusedIndex */ newFocusedIndex]
  },
}

const renderHeight = {
  isEqual(oldState: QuickPickState, newState: QuickPickState): boolean {
    return oldState.items.length === newState.items.length
  },
  apply(oldState: QuickPickState, newState: QuickPickState): any[] {
    if (newState.items.length === 0) {
      return [/* method */ RenderMethod.SetItemsHeight, /* height */ newState.itemHeight]
    }
    const maxLineY = Math.min(newState.maxLineY, newState.items.length)
    const itemCount = maxLineY - newState.minLineY
    const height = itemCount * newState.itemHeight
    return [/* method */ RenderMethod.SetItemsHeight, /* height */ height]
  },
}

const renderFocus = {
  isEqual(oldState: QuickPickState, newState: QuickPickState): boolean {
    return oldState.focused === newState.focused
  },
  apply(oldState: QuickPickState, newState: QuickPickState): any[] {
    const selector = newState.focused ? '.InputBox' : ''
    return ['Viewlet.focusSelector', selector]
  },
}

export const render = [renderFocus, renderItems, renderValue, renderCursorOffset, renderFocusedIndex, renderHeight]
