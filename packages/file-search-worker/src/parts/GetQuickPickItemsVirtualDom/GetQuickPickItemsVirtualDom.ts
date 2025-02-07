import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetQuickPickItemVirtualDom from '../GetQuickPickItemVirtualDom/GetQuickPickItemVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getQuickPickItemsVirtualDom = (visibleItems: readonly any[]): readonly VirtualDomNode[] => {
  if (visibleItems.length === 0) {
    return [
      {
        type: VirtualDomElements.Div,
        className: 'QuickPickItem QuickPickItemActive QuickPickStatus',
        childCount: 1,
      },
      {
        type: VirtualDomElements.Div,
        className: ClassNames.Label,
        childCount: 1,
      },
      text('No Results'),
    ]
  }
  const dom = visibleItems.flatMap(GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom)
  return dom
}
