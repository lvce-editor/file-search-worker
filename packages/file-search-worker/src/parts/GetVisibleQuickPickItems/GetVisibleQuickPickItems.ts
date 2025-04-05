import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export const getVisible = (
  setSize: number,
  protoVisibleItems: readonly ProtoVisibleItem[],
  minLineY: number,
  focusedIndex: number,
): readonly VisibleItem[] => {
  const visibleItems = protoVisibleItems.map((visibleItem, i) => {
    return {
      ...visibleItem,
      posInSet: minLineY + i + 1,
      setSize,
      isActive: i === focusedIndex,
    }
  })
  return visibleItems
}
