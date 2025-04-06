import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetHighlights from '../GetHighlights/GetHighlights.ts'

export const addHighlights = (dom: VirtualDomNode[], highlights: readonly number[], label: string): void => {
  const domHighlights = GetHighlights.getHighlights(highlights, label)
  dom.push(...domHighlights)
}
