import * as Command from '../Command/Command.js'
import * as GetProtocol from '../GetProtocol/GetProtocol.js'
import * as IconTheme from '../IconTheme/IconTheme.js'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.js'
import * as SearchFile from '../SearchFile/SearchFile.js'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.js'
import * as Workspace from '../Workspace/Workspace.js'

const searchFile = async (path: any, value: any) => {
  const prepare = true
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

// TODO help entries should not be here
export const getHelpEntries = (): any[] => {
  return [
    {
      description: ViewletQuickPickStrings.goToFile(),
      category: 'global commands',
    },
  ]
}

export const getNoResults = (): any => {
  return {
    label: ViewletQuickPickStrings.noMatchingResults(),
  }
}

export const getPicks = async (searchValue: any) => {
  const workspace = Workspace.state.workspacePath
  if (!workspace) {
    return []
  }
  const files = await searchFile(workspace, searchValue)
  // const picks = files.map(toPick)
  return files
}

export const selectPick = async (pick: any) => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const workspace = Workspace.state.workspacePath
  const absolutePath = `${workspace}/${pick}`
  await Command.execute(/* Main.openUri */ 'Main.openUri', /* uri */ absolutePath)
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const getFilterValue = (value: any) => {
  return value
}

export const getPickFilterValue = (pick: any) => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  return pick
}

export const getPickLabel = (pick: any) => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const baseName = Workspace.pathBaseName(pick)
  return baseName
}

export const getPickDescription = (pick: any) => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const dirName = Workspace.pathDirName(pick)
  return dirName
}

export const getPickIcon = () => {
  return ''
}

export const getPickFileIcon = (pick: any) => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const baseName = Workspace.pathBaseName(pick)
  return IconTheme.getFileIcon({ name: baseName })
}

export const isPrepared = (): boolean => {
  const workspace = Workspace.state.workspacePath
  // TODO protocol should always be defined. For files it should use file protocol
  const protocol = GetProtocol.getProtocol(workspace)
  return !protocol
}