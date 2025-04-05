import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getVisibleItems = (
  files: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
  icons: readonly string[],
): readonly ProtoVisibleItem[] => {
  const visibleItems = files.map((item, i) => {
    const pick = item.pick
    const label = getPickLabel(pick)
    const description = getPickDescription(pick)
    const icon = getPickIcon()
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

const getPickLabel = (pick: any): string => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const baseName = Workspace.pathBaseName(pick)
  return baseName
}

const getPickDescription = (pick: any): string => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const dirName = Workspace.pathDirName(pick)
  return dirName
}

const getPickIcon = (): string => {
  return ''
}
