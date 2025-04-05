import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as Icon from '../Icon/Icon.ts'
import * as IconType from '../IconType/IconType.ts'

const getPickDescription = (pick: any): string => {
  return pick.description || ''
}

const getPickLabel = (pick: any): any => {
  return pick.label
}

const convertIcon = (icon: any): string => {
  switch (icon) {
    case IconType.SourceControl:
      return Icon.SourceControl
    case IconType.Cloud:
      return Icon.Cloud
    case IconType.Tag:
      return Icon.Tag
    default:
      return Icon.None
  }
}

const getPickIcon = (pick: any): string => {
  return convertIcon(pick.icon)
}

export const getVisibleItems = (picks: readonly any[], icons: readonly string[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((pick: any, index: number) => ({
    description: getPickDescription(pick),
    fileIcon: '',
    icon: getPickIcon(pick),
    label: getPickLabel(pick),
    matches: [],
  }))
  return visibleItems
}
