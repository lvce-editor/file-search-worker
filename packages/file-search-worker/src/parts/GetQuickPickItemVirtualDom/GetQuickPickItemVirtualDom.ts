import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const quickPickHighlight = {
  type: VirtualDomElements.Span,
  className: ClassNames.QuickPickHighlight,
  childCount: 1,
}

const addHighlights = (dom: VirtualDomNode[], highlights: readonly any[], label: string): void => {
  const labelDom = {
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItemLabel,
    childCount: 0,
  }
  dom.push(labelDom)
  let position = 0
  for (let i = 0; i < highlights.length; i += 2) {
    const highlightStart = highlights[i]
    const highlightEnd = highlights[i + 1]
    if (position < highlightStart) {
      const beforeText = label.slice(position, highlightStart)
      labelDom.childCount++
      dom.push(text(beforeText))
    }
    const highlightText = label.slice(highlightStart, highlightEnd)
    labelDom.childCount++
    dom.push(quickPickHighlight, text(highlightText))
    position = highlightEnd
  }
  if (position < label.length) {
    const afterText = label.slice(position)
    labelDom.childCount++
    dom.push(text(afterText))
  }
}

export const getQuickPickItemVirtualDom = (visibleItem: any): readonly VirtualDomNode[] => {
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
  addHighlights(dom, highlights, label)
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
