import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as GetQuickPickVirtualDom from '../GetQuickPickVirtualDom/GetQuickPickVirtualDom.ts'

export const renderItems = (newState: QuickPickViewModel): readonly unknown[] => {
  const dom = GetQuickPickVirtualDom.getQuickPickVirtualDom(newState.visibleItems, newState.scrollBarHeight, newState.scrollBarTop)
  return ['Viewlet.setDom2', dom]
}
