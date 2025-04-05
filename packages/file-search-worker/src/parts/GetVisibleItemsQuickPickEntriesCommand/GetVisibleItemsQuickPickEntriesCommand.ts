import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

const getPickIcon = (): string => {
  return ''
}

const getPickLabel = (pick: any): string => {
  return pick.label
}

export const getVisibleItems = (picks: readonly any[], icons: readonly string[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((item, index) => {
    const pick = item
    return {
      description: pick.description || '',
      fileIcon: '',
      icon: getPickIcon(),
      label: getPickLabel(pick),
      matches: [],
    }
  })
  return visibleItems
}
