import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as ErrorHandling from '../ErrorHandling/ErrorHandling.ts'
import * as MenuEntriesState from '../MenuEntriesState/MenuEntriesState.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'

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

const toProtoVisibleItem = (item: any): ProtoVisibleItem => {
  const pick: ProtoVisibleItem = {
    label: item.label,
    description: '',
    fileIcon: '',
    icon: '',
    matches: [],
    direntType: 0,
    uri: '',
  }
  // @ts-ignore
  pick.id = item.id
  // @ts-ignore
  pick.args = item.args
  return pick
}

export const getPicks = async (): Promise<readonly ProtoVisibleItem[]> => {
  // TODO get picks in parallel
  const builtinPicks = await getBuiltinPicks()
  const extensionPicks = await getExtensionPicks()
  const allPicks = [...builtinPicks, ...extensionPicks]
  const converted = allPicks.map(toProtoVisibleItem)
  return converted
}
