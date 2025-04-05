import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

const getPickIcon = (): string => {
  return ''
}

const getPickLabel = (pick: any): string => {
  return pick.label
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
    description: pick.description || '',
    fileIcon: '',
    icon: getPickIcon(),
    isActive: index + minLineY === focusedIndex,
    label: getPickLabel(pick),
    matches: [],
    posInSet: index + minLineY + 1,
    setSize,
  }))
  return visibleItems
}
