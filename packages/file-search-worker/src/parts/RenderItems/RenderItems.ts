import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as GetQuickPickItemsVirtualDom from '../GetQuickPickItemsVirtualDom/GetQuickPickItemsVirtualDom.ts'
import * as GetQuickPickVirtualDom from '../GetQuickPickVirtualDom/GetQuickPickVirtualDom.ts'

export const renderItems = (newState: QuickPickViewModel): readonly any[] => {
  if (newState.renderAllItems) {
    const dom = GetQuickPickVirtualDom.getQuickPickVirtualDom(newState.visibleItems)
    return ['Viewlet.setDom2', dom]
  }
  const dom = GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(newState.visibleItems)
  return ['Viewlet.send', newState.uid, /* method */ 'setItemsDom', dom]
}
