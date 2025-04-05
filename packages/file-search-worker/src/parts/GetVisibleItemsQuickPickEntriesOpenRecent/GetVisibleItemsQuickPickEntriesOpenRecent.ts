import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
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

export const getVisibleItems = (
  picks: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
  icons: readonly string[],
): readonly VisibleItem[] => {
  const visibleItems = picks.map((item: any, index: number) => {
    const pick = item.pick
    const fileIcon = icons[index]
    return {
      description: getPickDescription(pick),
      fileIcon,
      icon: getPickIcon(),
      isActive: index + minLineY === focusedIndex,
      label: getPickLabel(pick),
      matches: pick.matches,
      posInSet: index + minLineY + 1,
      setSize,
    }
  })
  return visibleItems
}
