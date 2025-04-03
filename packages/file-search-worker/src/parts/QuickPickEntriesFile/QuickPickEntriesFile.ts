import type { Dirent } from '../Dirent/Dirent.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as GetWorkspacePath from '../GetWorkspacePath/GetWorkspacePath.ts'
import * as OpenUri from '../OpenUri/OpenUri.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const searchFile = async (path: string, value: string): Promise<readonly any[]> => {
  const prepare = true
  // @ts-ignore
  const files = await SearchFile.searchFile(/* path */ path, /* searchTerm */ value, prepare)
  return files
}

export const name = 'file'

export const getPlaceholder = (): string => {
  return ''
}

export const getLabel = (): string => {
  return ViewletQuickPickStrings.files()
}

export const getNoResults = (): any => {
  return {
    label: ViewletQuickPickStrings.noMatchingResults(),
  }
}

export const getPicks = async (searchValue: string): Promise<readonly any[]> => {
  // TODO cache workspace path
  const workspace = await GetWorkspacePath.getWorkspacePath()
  if (!workspace) {
    return []
  }
  const files = await searchFile(workspace, searchValue)
  return files
}

export const selectPick = async (pick: any): Promise<any> => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const workspace = await GetWorkspacePath.getWorkspacePath()
  const absolutePath = `${workspace}/${pick}`
  await OpenUri.openUri(absolutePath)
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const getFilterValue = (value: any): string => {
  return value
}

export const getPickFilterValue = (pick: any): string => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  return pick
}

export const getPickLabel = (pick: any): string => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const baseName = Workspace.pathBaseName(pick)
  return baseName
}

export const getPickDescription = (pick: any): string => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const dirName = Workspace.pathDirName(pick)
  return dirName
}

export const getPickIcon = (): string => {
  return ''
}

export const getPickFileIcon = (pick: any): Dirent => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const baseName = Workspace.pathBaseName(pick)
  return {
    type: DirentType.File,
    name: baseName,
    path: pick,
  }
}

export const isPrepared = (): boolean => {
  const workspace = ''
  // TODO protocol should always be defined. For files it should use file protocol
  const protocol = GetProtocol.getProtocol(workspace)
  return !protocol
}

export const getVisibleItems = (
  files: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
  icons: readonly string[],
): readonly VisibleItem[] => {
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
      posInSet: minLineY + i + 1,
      setSize,
      isActive: i === focusedIndex,
      matches: item.matches,
    }
  })
  return visibleItems
}
