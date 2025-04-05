import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getVisibleItems = (picks: readonly any[], icons: readonly string[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((pick, index) => ({
    description: '',
    fileIcon: '',
    icon: '',
    label: pick.label,
    matches: [],
  }))
  return visibleItems
}
