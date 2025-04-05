import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

const getPickDescription = (value: any): string => {
  return ''
}

const getPickIcon = (pick: any): string => {
  return ''
}

const getPickLabel = (pick: any): string => {
  return pick
}

export const getVisibleItems = (
  picks: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
  icons: readonly string[],
): readonly VisibleItem[] => {
  const visibleItems = picks.map((pick, index) => ({
    description: getPickDescription(pick),
    fileIcon: '',
    icon: getPickIcon(pick),
    isActive: index + minLineY === focusedIndex,
    label: getPickLabel(pick),
    matches: [],
    posInSet: index + minLineY + 1,
    setSize,
  }))
  return visibleItems
}
