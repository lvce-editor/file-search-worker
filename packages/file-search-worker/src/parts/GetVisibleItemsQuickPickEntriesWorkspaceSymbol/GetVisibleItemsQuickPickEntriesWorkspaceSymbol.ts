import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getVisibleItems = (picks: readonly ProtoVisibleItem[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((pick: ProtoVisibleItem, index: number) => ({
    description: '',
    fileIcon: '',
    icon: '',
    label: pick.label || '',
    matches: [],
  }))
  return visibleItems
}
