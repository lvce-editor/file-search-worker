import * as DirentType from '../DirentType/DirentType.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as Rpc from '../Rpc/Rpc.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const getRecentlyOpened = (): Promise<any> => {
  return Rpc.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
}

const openWorkspaceFolder = (uri: string): Promise<void> => {
  return Rpc.invoke(/* Workspace.setPath */ 'Workspace.setPath', /* path */ uri)
}

export const getPlaceholder = (): any => {
  return ViewletQuickPickStrings.selectToOpen()
}

export const getLabel = (): any => {
  return ViewletQuickPickStrings.openRecent()
}

export const getHelpEntries = (): any => {
  return []
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
  const recentlyOpened = await getRecentlyOpened()
  return recentlyOpened
}

// TODO selectPick should be independent of show/hide
export const selectPick = async (pick: string): Promise<any> => {
  const path = pick
  await openWorkspaceFolder(path)
  return {
    command: QuickPickReturnValue.Hide,
  }
}

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

export const getPickFileIcon = (pick: any): any => {
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

export const state = {}

export const isPrepared = (): boolean => {
  return false
}

export const name = ''
