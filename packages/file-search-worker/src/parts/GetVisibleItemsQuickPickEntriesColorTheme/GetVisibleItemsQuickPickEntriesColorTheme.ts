import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getVisibleItems = (picks: readonly ProtoVisibleItem[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((item) => {
    const pick = item
    return {
      description: pick.description,
      fileIcon: '',
      icon: pick.icon,
      label: pick.label,
      matches: [],
    }
  })
  return visibleItems
}
