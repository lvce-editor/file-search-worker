import type { Dirent } from '../Dirent/Dirent.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as GetRecentlyOpened from '../GetRecentlyOpened/GetRecentlyOpened.ts'
import * as GetVisibleItemsQuickPickEntriesOpenRecent from '../GetVisibleItemsQuickPickEntriesOpenRecent/GetVisibleItemsQuickPickEntriesOpenRecent.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getPlaceholder = (): string => {
  return ViewletQuickPickStrings.selectToOpen()
}

export const getLabel = (): string => {
  return ViewletQuickPickStrings.openRecent()
}

export const getNoResults = (): any => {
  return {
    label: ViewletQuickPickStrings.noRecentlyOpenedFoldersFound(),
  }
}

// TODO could also change api so that getPicks returns an array of anything
// and the transformPick gets the label for each pick
// This would make the code more module since the code for getting the picks
// would be more independent of the specific data format of the quickpick provider

export const getPicks = async (): Promise<any> => {
  const recentlyOpened = await GetRecentlyOpened.getRecentlyOpened()
  return recentlyOpened
}

export const getVisibleItems = GetVisibleItemsQuickPickEntriesOpenRecent.getVisibleItems

export const getFilterValue = (value: string): string => {
  return Workspace.pathBaseName(value)
}

export const getPickFilterValue = (pick: string): string => {
  return Workspace.pathBaseName(pick)
}

export const getPickLabel = (pick: string): string => {
  return Workspace.pathBaseName(pick)
}

export const getPickDescription = (pick: string): string => {
  return Workspace.pathDirName(pick)
}

export const getPickIcon = (): any => {
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

export const state = {}

export const isPrepared = (): boolean => {
  return false
}

export const name = ''

export { selectPick } from '../SelectPickRecent/SelectPickRecent.ts'
