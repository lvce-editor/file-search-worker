import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getVisibleItems = (files: readonly ProtoVisibleItem[], icons: readonly string[]): readonly ProtoVisibleItem[] => {
  const visibleItems = files.map((item, i) => {
    const pick = item
    const label = pick.label
    const description = pick.description
    const icon = pick.icon
    const fileIcon = icons[i]
    return {
      label,
      description,
      icon,
      fileIcon,
      matches: item.matches,
    }
  })
  return visibleItems
}
