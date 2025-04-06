import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getVisibleItems = (picks: readonly ProtoVisibleItem[], icons: readonly string[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((item: ProtoVisibleItem, index: number) => {
    const pick = item
    const fileIcon = icons[index]
    return {
      description: pick.description,
      fileIcon,
      icon: pick.icon,
      label: pick.label,
      matches: pick.matches || [],
    }
  })
  return visibleItems
}
