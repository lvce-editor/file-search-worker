import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetQuickPickHeaderVirtualDom from '../GetQuickPickHeaderVirtualDom/GetQuickPickHeaderVirtualDom.ts'
import * as GetQuickPickItemsVirtualDom from '../GetQuickPickItemsVirtualDom/GetQuickPickItemsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getQuickPickVirtualDom = (visibleItems: readonly any[]): readonly VirtualDomNode[] => {
  const quickOpen = QuickPickStrings.quickOpen()
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.QuickPick),
      childCount: 2,
      id: DomId.QuickPick,
      ariaLabel: quickOpen,
    },
    ...GetQuickPickHeaderVirtualDom.getQuickPickHeaderVirtualDom(),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.QuickPickItems,
      id: DomId.QuickPickItems,
      role: AriaRoles.ListBox,
      childCount: visibleItems.length,
    },
    ...GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(visibleItems),
  ]
}
