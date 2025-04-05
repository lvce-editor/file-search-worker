import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const getPickDescription = (pick: string): string => {
  return Workspace.pathDirName(pick)
}

const getPickIcon = (): any => {
  return ''
}

const getPickLabel = (pick: string): string => {
  return Workspace.pathBaseName(pick)
}

export const getVisibleItems = (picks: readonly any[], icons: readonly string[]): readonly ProtoVisibleItem[] => {
  const visibleItems = picks.map((item: any, index: number) => {
    const pick = item.pick
    const fileIcon = icons[index]
    return {
      description: getPickDescription(pick),
      fileIcon,
      icon: getPickIcon(),
      label: getPickLabel(pick),
      matches: pick.matches,
    }
  })
  return visibleItems
}
