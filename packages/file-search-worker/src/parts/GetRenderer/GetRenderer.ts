import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as GetQuickPickItemsVirtualDom from '../GetQuickPickItemsVirtualDom/GetQuickPickItemsVirtualDom.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

const renderValue = (newState: QuickPickViewModel): any => {
  return ['Viewlet.send', newState.uid, /* method */ RenderMethod.SetValue, /* value */ newState.value]
}

const renderCursorOffset = (newState: QuickPickViewModel): any => {
  return ['Viewlet.send', newState.uid, /* method */ RenderMethod.SetCursorOffset, /* cursorOffset */ newState.cursorOffset]
}

const renderItems = (newState: QuickPickViewModel): any => {
  const dom = GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(newState.visibleItems)
  return ['Viewlet.send', newState.uid, /* method */ 'setItemsDom', dom]
}

const renderFocusedIndex = (newState: QuickPickViewModel): any => {
  return [
    'Viewlet.send',
    newState.uid,
    /* method */ RenderMethod.SetFocusedIndex,
    /* oldFocusedIndex */ newState.oldFocusedIndex,
    /* newFocusedIndex */ newState.newFocusedIndex,
  ]
}

const renderHeight = (newState: QuickPickViewModel): any => {
  if (newState.height === 0) {
    return ['Viewlet.send', newState.uid, /* method */ RenderMethod.SetItemsHeight, /* height */ 20]
  }
  return ['Viewlet.send', newState.uid, /* method */ RenderMethod.SetItemsHeight, /* height */ newState.height]
}

const renderFocus = (newState: QuickPickViewModel): any => {
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
