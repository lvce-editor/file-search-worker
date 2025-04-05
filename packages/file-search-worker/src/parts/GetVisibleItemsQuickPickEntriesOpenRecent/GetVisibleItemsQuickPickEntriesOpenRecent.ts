import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
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

const getPickFileIcon = (pick: any): any => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  return {
    type: DirentType.Directory,
    name: pick,
  }
}

export const getVisibleItems = (
  picks: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
): readonly VisibleItem[] => {
  const visibleItems = picks.map((pick: string, index: number) => ({
    description: getPickDescription(pick),
    fileIcon: getPickFileIcon(pick),
    icon: getPickIcon(),
    isActive: index + minLineY === focusedIndex,
    label: getPickLabel(pick),
    matches: [],
    posInSet: index + minLineY + 1,
    setSize,
  }))
  return visibleItems
}
