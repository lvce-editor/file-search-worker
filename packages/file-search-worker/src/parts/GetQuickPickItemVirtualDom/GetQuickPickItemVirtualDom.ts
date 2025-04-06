import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as GetHighlights from '../GetHighlights/GetHighlights.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getQuickPickItemVirtualDom = (visibleItem: VisibleItem): readonly VirtualDomNode[] => {
  const { posInSet, label, setSize, isActive, description, icon, highlights, fileIcon } = visibleItem
  const dom: any[] = []
  dom.push({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItem,
    role: AriaRoles.Option,
    ariaPosInSet: posInSet,
    ariaSetSize: setSize,
    childCount: 1,
  })
  const parent = dom[0]
  if (isActive) {
    // @ts-ignore
    parent.id = DomId.QuickPickItemActive
    parent.className += ' ' + ClassNames.QuickPickItemActive
  }
  if (fileIcon) {
    parent.childCount++
    dom.push(GetFileIconVirtualDom.getFileIconVirtualDom(fileIcon))
  } else if (icon) {
    parent.childCount++
    dom.push({
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.QuickPickMaskIcon, ClassNames.MaskIcon, `MaskIcon${icon}`),
      childCount: 0,
    })
  }
  const highlightDom = GetHighlights.getHighlights(highlights, label)
  dom.push(...highlightDom)
  if (description) {
    parent.childCount++
    dom.push(
      {
        type: VirtualDomElements.Div,
        className: ClassNames.QuickPickItemDescription,
        childCount: 1,
      },
      text(description),
    )
  }
  return dom
}
