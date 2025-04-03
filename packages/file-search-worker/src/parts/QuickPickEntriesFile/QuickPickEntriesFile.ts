import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as FilterQuickPickItem from '../FilterQuickPickItem/FilterQuickPickItem.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as GetWorkspacePath from '../GetWorkspacePath/GetWorkspacePath.ts'
import * as OpenUri from '../OpenUri/OpenUri.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as RequestFileIcons from '../RequestFileIcons/RequestFileIcons.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const state = {
  items: [] as readonly any[],
}

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

export const getNoResults = (): any => {
  return {
    label: ViewletQuickPickStrings.noMatchingResults(),
  }
}

export const getPicks = async (searchValue: any): Promise<readonly any[]> => {
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

export const getVisibleItems = async (
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  searchValue: string,
): Promise<readonly VisibleItem[]> => {
  // Query items using searchValue
  const workspace = await GetWorkspacePath.getWorkspacePath()
  if (!workspace) {
    return []
  }
  const files = await searchFile(workspace, searchValue)

  // Filter items and store in state
  const filteredItems = []
  for (const file of files) {
    const filterValue = getPickFilterValue(file)
    const matches = FilterQuickPickItem.filterQuickPickItem(searchValue, filterValue)
    if (matches.length > 0) {
      filteredItems.push({
        pick: file,
        matches,
      })
    }
  }
  state.items = filteredItems

  const visibleItems = []
  const setSize = state.items.length
  const max = Math.min(setSize, maxLineY)
  const itemsToProcess = state.items.slice(minLineY, maxLineY)
  const iconRequests = itemsToProcess.map((item) => ({
    name: Workspace.pathBaseName(item.pick),
    path: '',
    type: DirentType.File,
  }))
  const icons = await RequestFileIcons.requestFileIcons(iconRequests)
  let iconIndex = 0
  for (let i = minLineY; i < max; i++) {
    const item = state.items[i]
    const pick = item.pick
    const label = getPickLabel(pick)
    const description = getPickDescription(pick)
    const icon = getPickIcon()
    const fileIcon = icons[iconIndex++]
    visibleItems.push({
      label,
      description,
      icon,
      fileIcon,
      posInSet: i + 1,
      setSize,
      isActive: i === focusedIndex,
      matches: item.matches,
    })
  }
  return visibleItems
}
