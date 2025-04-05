import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export const getVisibleItems = (
  picks: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
): readonly VisibleItem[] => {
  const visibleItems = picks.map((pick: any, index: number) => ({
    description: '',
    fileIcon: '',
    icon: '',
    isActive: index + minLineY === focusedIndex,
    label: pick.label || '',
    matches: [],
    posInSet: index + minLineY + 1,
    setSize,
  }))
  return visibleItems
}
