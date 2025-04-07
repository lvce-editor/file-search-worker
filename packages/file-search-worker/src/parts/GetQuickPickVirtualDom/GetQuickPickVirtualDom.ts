import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetQuickPickHeaderVirtualDom from '../GetQuickPickHeaderVirtualDom/GetQuickPickHeaderVirtualDom.ts'
import * as GetQuickPickItemsVirtualDom from '../GetQuickPickItemsVirtualDom/GetQuickPickItemsVirtualDom.ts'
import * as GetScrollBarVirtualDom from '../GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export const getQuickPickVirtualDom = (
  visibleItems: readonly VisibleItem[],
  scrollBarHeight: number,
  scrollBarTop: number,
): readonly VirtualDomNode[] => {
  const quickOpen = QuickPickStrings.quickOpen()
  const shouldShowScrollbar = scrollBarHeight > 0
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
      className: MergeClassNames.mergeClassNames(ClassNames.List, ClassNames.ContainContent),
      id: DomId.QuickPickItems,
      role: AriaRoles.ListBox,
      ariaActivedescendant: DomId.QuickPickItemActive,
      onWheel: DomEventListenerFunctions.HandleWheel,
      onPointerDown: DomEventListenerFunctions.HandlePointerDown,
      childCount: shouldShowScrollbar ? 2 : 1,
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.ListItems, ClassNames.ContainContent),
      childCount: visibleItems.length,
    },
    ...GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(visibleItems),
    ...GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarTop),
  ]
}
