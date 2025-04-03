import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ErrorHandling from '../ErrorHandling/ErrorHandling.ts'
import * as MenuEntriesState from '../MenuEntriesState/MenuEntriesState.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as Rpc from '../Rpc/Rpc.ts'

export const name = 'command'

export const getPlaceholder = (): string => {
  return ViewletQuickPickStrings.typeNameofCommandToRun()
}

export const getLabel = (): string => {
  return ''
}

export const getNoResults = (): any => {
  return {
    label: ViewletQuickPickStrings.noMatchingResults(),
  }
}

// TODO combine Ajax with cache (specify strategy: cacheFirst, networkFirst)
const getBuiltinPicks = async (): Promise<readonly any[]> => {
  const builtinPicks = MenuEntriesState.getAll()
  return builtinPicks
}

const prefixIdWithExt = (item: any): any => {
  if (!item.label) {
    ErrorHandling.warn('[QuickPick] item has missing label', item)
  }
  if (!item.id) {
    ErrorHandling.warn('[QuickPick] item has missing id', item)
  }
  return {
    ...item,
    id: `ext.${item.id}`,
    label: item.label || item.id,
  }
}

const getExtensionPicks = async (): Promise<readonly any[]> => {
  try {
    // TODO don't call this every time
    const extensionPicks = await Rpc.invoke('ExtensionHost.getCommands')
    if (!extensionPicks) {
      return []
    }
    const mappedPicks = extensionPicks.map(prefixIdWithExt)
    return mappedPicks
  } catch (error) {
    console.error(`Failed to get extension picks: ${error}`)
    return []
  }
}

// TODO send strings to renderer process only once for next occurrence send uint16array of ids of strings

export const getPicks = async (): Promise<readonly any[]> => {
  const builtinPicks = await getBuiltinPicks()
  const extensionPicks = await getExtensionPicks()
  const allPicks = [...builtinPicks, ...extensionPicks]
  return allPicks
}

export const getVisibleItems = async (
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  searchValue: string,
): Promise<readonly VisibleItem[]> => {
  const filterValue = getFilterValue(searchValue)
  if (!filterValue) {
    return []
  }
  const picks = await getPicks()
  const visibleItems = picks.slice(minLineY, maxLineY + 1).map((pick, index) => ({
    description: pick.description || '',
    fileIcon: '',
    icon: getPickIcon(),
    isActive: index + minLineY === focusedIndex,
    label: getPickLabel(pick),
    matches: [],
    posInSet: index + minLineY + 1,
    setSize: picks.length,
  }))
  return visibleItems
}

const shouldHide = (item: any): boolean => {
  if (item.id === 'Viewlet.openWidget' && item.args[0] === 'QuickPick') {
    return false
  }
  return true
}

const selectPickBuiltin = async (item: any): Promise<any> => {
  const args = item.args || []
  // TODO ids should be all numbers for efficiency -> also directly can call command
  await Rpc.invoke(item.id, ...args)
  if (shouldHide(item)) {
    return {
      command: QuickPickReturnValue.Hide,
    }
  }
  return {
    command: QuickPickReturnValue.KeepOpen,
  }
}

const selectPickExtension = async (item: any): Promise<any> => {
  const id = item.id.slice(4) // TODO lots of string allocation with 'ext.' find a better way to separate builtin commands from extension commands
  try {
    await Rpc.invoke('ExtensionHost.executeCommand', id)
  } catch (error) {
    await ErrorHandling.handleError(error, false)
    await ErrorHandling.showErrorDialog(error)
  }
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const selectPick = async (item: any): Promise<any> => {
  if (item.id.startsWith('ext.')) {
    return selectPickExtension(item)
  }
  return selectPickBuiltin(item)
}

export const getFilterValue = (value: string): string => {
  return value.trim()
}

export const getPickFilterValue = (pick: any): any => {
  return pick.label
}

export const getPickLabel = (pick: any): string => {
  return pick.label
}

export const getPickIcon = (): string => {
  return ''
}
