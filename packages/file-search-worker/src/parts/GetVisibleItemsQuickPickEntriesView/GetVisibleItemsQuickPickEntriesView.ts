import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

const getPickDescription = (): string => {
  return ''
}

const getPickIcon = (value: string): string => {
  return ''
}

const getPickLabel = (value: string): string => {
  return value
}

export const getVisibleItems = (picks: readonly any[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((pick: any, index: number) => ({
    description: getPickDescription(),
    fileIcon: '',
    icon: getPickIcon(pick),
    label: getPickLabel(pick),
    matches: [],
    direntType: 0,
    uri: '',
  }))
  return visibleItems
}
