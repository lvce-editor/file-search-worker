import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

const getPickDescription = (): string => {
  return ''
}

const getPickIcon = (value: string): string => {
  return ''
}

const getPickLabel = (value: string): string => {
  return value
}

export const getVisibleItems = (
  picks: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
): readonly VisibleItem[] => {
  const visibleItems = picks.map((pick: any, index: number) => ({
    description: getPickDescription(),
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
