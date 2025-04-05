import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getVisibleItems = (
  picks: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((pick: any, index: number) => ({
    description: '',
    fileIcon: '',
    icon: '',
    label: pick.label || '',
    matches: [],
  }))
  return visibleItems
}
