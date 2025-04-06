import type { Dirent } from '../Dirent/Dirent.ts'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const state = {}

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

export const getPickFileIcon = (pick: ProtoVisibleItem): Dirent => {
  const path = `${pick.description}/${pick.label}`
  return {
    type: DirentType.File,
    name: pick.label,
    path,
  }
}

export const isPrepared = (): boolean => {
  const workspace = ''
  // TODO protocol should always be defined. For files it should use file protocol
  const protocol = GetProtocol.getProtocol(workspace)
  return !protocol
}

export { getPicks } from '../GetPicksFile/GetPicksFile.ts'

export { selectPick } from '../SelectPickFile/SelectPickFile.ts'
