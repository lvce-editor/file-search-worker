import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as GetQuickPickProvider from '../GetQuickPickProvider/GetQuickPickProvider.ts'
import * as QuickPickNoop from '../QuickPickEntriesNoop/QuickPickNoop.ts'

// TODO cache quick pick items -> don't send every time from renderer worker to renderer process
// maybe cache by id opening commands -> has all commands cached
// when filtering -> sends all indices (uint16Array) to renderer process instead of filtered/sorted command objects

// @ts-ignore
const RECENT_PICKS_MAX_SIZE = 3

// TODO avoid global variable

export const state = {
  // providerId: PROVIDER_NOOP,
  provider: QuickPickNoop,
  prefix: 'string-that-should-never-match-another-string',
}

/**
 * @type {string}
 */
export const name = 'everything'

export const getPlaceholder = () => {
  return 'Type to search'
}

export const getNoResults = () => {
  return 'No results found'
}

export const getPicks = async (value: any): Promise<readonly any[]> => {
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)

  // TODO race condition
  if (state.prefix !== prefix) {
    state.prefix = prefix
    state.provider = await GetQuickPickProvider.getQuickPickProvider(prefix)
  }
  // TODO this line is a bit duplicated with getFilterValue
  const slicedValue = value.slice(prefix.length).trimStart()
  const picks = await state.provider.getPicks(slicedValue)
  return picks
}

export const getVisibleItems = async (
  items: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  searchValue: string,
): Promise<readonly VisibleItem[]> => {
  const filterValue = getFilterValue(searchValue)
  if (!filterValue) {
    return []
  }
  const visibleItems = items.slice(minLineY, maxLineY + 1).map((pick: any, index: number) => ({
    description: getPickDescription(pick),
    fileIcon: getPickFileIcon(pick),
    icon: getPickIcon(pick),
    isActive: index + minLineY === focusedIndex,
    label: getPickLabel(pick),
    matches: [],
    posInSet: index + minLineY + 1,
    setSize: items.length,
  }))
  return visibleItems
}

export const selectPick = async (pick: any) => {
  const { provider } = state
  return provider.selectPick(pick)
}

export const getFilterValue = (value: any): string => {
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)
  if (state.prefix !== prefix) {
    return ''
  }
  return value.slice(prefix.length).trimStart()
}

export const getPickFilterValue = (pick: any): any => {
  const { provider } = state
  return provider.getPickFilterValue(pick)
}

export const getPickDescription = (pick: any): any => {
  const { provider } = state
  // @ts-ignore
  if (provider.getPickDescription) {
    // @ts-ignore
    return provider.getPickDescription(pick)
  }
  return ''
}

export const getPickLabel = (pick: any): any => {
  const { provider } = state
  // @ts-ignore
  return provider.getPickLabel(pick)
}

export const getPickIcon = (pick: any): string => {
  const { provider } = state
  // @ts-ignore
  return provider.getPickIcon(pick)
}

export const getPickFileIcon = (pick: any): any => {
  const { provider } = state
  // @ts-ignore
  if (provider.getPickFileIcon) {
    // @ts-ignore
    return provider.getPickFileIcon(pick)
  }
  return ''
}

export const isPrepared = () => {
  return true
}
