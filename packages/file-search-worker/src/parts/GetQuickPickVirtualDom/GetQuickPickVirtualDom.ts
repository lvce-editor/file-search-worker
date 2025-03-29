import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetQuickPickHeaderVirtualDom from '../GetQuickPickHeaderVirtualDom/GetQuickPickHeaderVirtualDom.ts'
import * as GetQuickPickItemsVirtualDom from '../GetQuickPickItemsVirtualDom/GetQuickPickItemsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getQuickPickVirtualDom = (visibleItems: readonly any[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.QuickPick),
      childCount: 2,
      id: 'QuickPick',
      ariaLabel: 'Quick open',
    },
    ...GetQuickPickHeaderVirtualDom.getQuickPickHeaderVirtualDom(),
    ...GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(visibleItems),
  ]
}
