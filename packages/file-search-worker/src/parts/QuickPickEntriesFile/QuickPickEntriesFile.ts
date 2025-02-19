import * as Command from '../Command/Command.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as Rpc from '../Rpc/Rpc.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const searchFile = async (path: any, value: any): Promise<readonly any[]> => {
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

export const getPicks = async (searchValue: any): Promise<readonly any[]> => {
  // TODO cache workspace path
  const workspace = await Rpc.invoke('Workspace.getPath')
  if (!workspace) {
    return []
  }
  const files = await searchFile(workspace, searchValue)
  // const picks = files.map(toPick)
  return files
}

export const selectPick = async (pick: any): Promise<any> => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const workspace = ''
  const absolutePath = `${workspace}/${pick}`
  await Command.execute(/* Main.openUri */ 'Main.openUri', /* uri */ absolutePath)
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

export const getPickFileIcon = (pick: any): any => {
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
  }
}

export const isPrepared = (): boolean => {
  const workspace = ''
  // TODO protocol should always be defined. For files it should use file protocol
  const protocol = GetProtocol.getProtocol(workspace)
  return !protocol
}
