import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getVisibleItems = (picks: readonly ProtoVisibleItem[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((item) => {
    const pick = item
    return {
      description: pick.description || '',
      fileIcon: '',
      icon: '',
      label: pick.label,
      matches: [],
      uri: pick.uri,
      direntType: pick.direntType,
    }
  })
  return visibleItems
}
