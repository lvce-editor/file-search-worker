import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getVisibleItems = (picks: readonly any[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((pick: any, index: number) => ({
    description: '',
    fileIcon: '',
    icon: '',
    label: pick.label || '',
    matches: [],
  }))
  return visibleItems
}
