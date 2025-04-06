import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as GetHighlightSections from '../GetHighlightSections/GetHighlightSections.ts'

export const getVisible = (
  setSize: number,
  protoVisibleItems: readonly ProtoVisibleItem[],
  minLineY: number,
  focusedIndex: number,
): readonly VisibleItem[] => {
  const visibleItems = protoVisibleItems.map((visibleItem, i) => {
    const highlights = visibleItem.matches.slice(1)
    const sections = GetHighlightSections.getHighlightSections(highlights, visibleItem.label)
    return {
      ...visibleItem,
      posInSet: minLineY + i + 1,
      setSize,
      isActive: i === focusedIndex,
      highlights: sections,
    }
  })
  return visibleItems
}
