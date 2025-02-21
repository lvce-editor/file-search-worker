import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as GetQuickPickItemsVirtualDom from '../GetQuickPickItemsVirtualDom/GetQuickPickItemsVirtualDom.ts'

export const renderItems = (newState: QuickPickViewModel): any => {
  const dom = GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(newState.visibleItems)
  return ['Viewlet.send', newState.uid, /* method */ 'setItemsDom', dom]
}
