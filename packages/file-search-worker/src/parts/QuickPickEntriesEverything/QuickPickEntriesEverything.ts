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

export const getPlaceholder = (): string => {
  return state.provider.getPlaceholder()
}

export const getLabel = (): string => {
  return ''
}

export const getNoResults = (): any => {
  return state.provider.getNoResults()
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

// @ts-ignore
const getPick = (state: any, index: number): any => {
  // if (index < state.recentPicks.length) {
  //   return state.recentPicks[index]
  // }
  // index -= state.recentPicks.length
  if (index < state.filteredPicks.length) {
    return state.filteredPicks[index]
  }
  console.warn('no pick matching index', index)
}

export const selectPick = (item: any): Promise<any> => {
  const { provider } = state
  return provider.selectPick(item)
}

export const openCommandPalette = (): void => {
  // show('>')
}

export const openView = (): void => {
  // show('view ')
}

export const getFilterValue = (value: string): string => {
  return value.slice(state.prefix.length).trim()
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

export const getPickFileIcon = (pick: any): string => {
  const { provider } = state
  // @ts-ignore
  if (provider.getPickFileIcon) {
    // @ts-ignore
    return provider.getPickFileIcon(pick)
  }
  return ''
}

export const isPrepared = (): boolean => {
  const { provider } = state
  // @ts-ignore
  if (provider.isPrepared) {
    // @ts-ignore
    return provider.isPrepared()
  }
  return false
}

export const getVisibleItems = async (
  picks: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
): Promise<readonly VisibleItem[]> => {
  const items = picks.map((pick) => pick.pick)
  const visibleItems = await state.provider.getVisibleItems(items, minLineY, maxLineY, focusedIndex, setSize)
  return visibleItems
}

// provider
// - create
// - loadcontent
// - filter
// - getVisible

// matches could be in loadcontent or getVisible
