import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getHighlightSections } from '../GetHighlightSections/GetHighlightSections.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const quickPickHighlight: VirtualDomNode = {
  type: VirtualDomElements.Span,
  className: ClassNames.QuickPickHighlight,
  childCount: 1,
}

export const getHighlights = (highlights: readonly number[], label: string): readonly VirtualDomNode[] => {
  const labelDom = {
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItemLabel,
    childCount: 0,
  }
  const nodes: VirtualDomNode[] = [labelDom]
  const sections = getHighlightSections(highlights, label)
  if (sections.length === 0) {
    labelDom.childCount++
    nodes.push(text(label))
  } else {
    for (const section of sections) {
      if (section.highlighted) {
        labelDom.childCount++
        nodes.push(quickPickHighlight, text(section.text))
      } else {
        labelDom.childCount++
        nodes.push(text(section.text))
      }
    }
  }
  return nodes
}
