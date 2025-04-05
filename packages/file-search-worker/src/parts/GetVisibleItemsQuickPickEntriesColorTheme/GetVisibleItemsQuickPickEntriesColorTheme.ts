import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

const getPickDescription = (value: any): string => {
  return ''
}

const getPickIcon = (pick: any): string => {
  return ''
}

const getPickLabel = (pick: any): string => {
  return pick
}

export const getVisibleItems = (picks: readonly any[], icons: readonly string[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((item, index) => {
    const pick = item.pick
    return {
      description: getPickDescription(pick),
      fileIcon: '',
      icon: getPickIcon(pick),
      label: getPickLabel(pick),
      matches: [],
    }
  })
  return visibleItems
}
