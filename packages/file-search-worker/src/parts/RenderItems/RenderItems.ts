import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as GetQuickPickVirtualDom from '../GetQuickPickVirtualDom/GetQuickPickVirtualDom.ts'

export const renderItems = (newState: QuickPickViewModel): readonly any[] => {
  const dom = GetQuickPickVirtualDom.getQuickPickVirtualDom(newState.visibleItems)
  return ['Viewlet.setDom2', dom]
}
