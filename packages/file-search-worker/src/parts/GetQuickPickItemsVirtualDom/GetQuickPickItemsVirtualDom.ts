import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetQuickPickItemVirtualDom from '../GetQuickPickItemVirtualDom/GetQuickPickItemVirtualDom.ts'
import * as GetQuickPickNoResultsVirtualDom from '../GetQuickPickNoResultsVirtualDom/GetQuickPickNoResultsVirtualDom.ts'

export const getQuickPickItemsVirtualDom = (visibleItems: readonly any[]): readonly VirtualDomNode[] => {
  if (visibleItems.length === 0) {
    return GetQuickPickNoResultsVirtualDom.getQuickPickNoResultsVirtualDom()
  }
  const dom = visibleItems.flatMap(GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom)
  return dom
}
