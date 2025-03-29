import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as AddHighlights from '../AddHighlights/AddHighlights.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getQuickPickItemVirtualDom = (visibleItem: VisibleItem): readonly VirtualDomNode[] => {
  const { posInSet, label, setSize, isActive, description, icon, matches, fileIcon } = visibleItem
  const highlights = matches.slice(1)
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
    parent.id = 'QuickPickItemActive'
    parent.className += ' ' + ClassNames.QuickPickItemActive
  }
  if (fileIcon) {
    parent.childCount++
    dom.push(GetFileIconVirtualDom.getFileIconVirtualDom(fileIcon))
  } else if (icon) {
    parent.childCount++
    dom.push({
      type: VirtualDomElements.Div,
      className: `QuickPickMaskIcon MaskIcon MaskIcon${icon}`,
      childCount: 0,
    })
  }
  AddHighlights.addHighlights(dom, highlights, label)
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
