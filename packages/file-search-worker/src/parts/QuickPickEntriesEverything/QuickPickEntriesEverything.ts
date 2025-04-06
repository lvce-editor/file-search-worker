import { state } from '../GetVisibleItemsQuickPickEntriesEverything/GetVisibleItemsQuickPickEntriesEverything.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'

// TODO cache quick pick items -> don't send every time from renderer worker to renderer process
// maybe cache by id opening commands -> has all commands cached
// when filtering -> sends all indices (uint16Array) to renderer process instead of filtered/sorted command objects

// @ts-ignore
const RECENT_PICKS_MAX_SIZE = 3

// TODO avoid global variable

// TODO don't store provider in state, only serialized value like provider-id

/**
 * @type {string}
 */
export const name = 'everything'

export const getPlaceholder = (): string => {
  const module = QuickPickEntries.get(state.provider)
  // @ts-ignore
  return module.getPlaceholder()
}

export const getLabel = (): string => {
  return ''
}

export const getNoResults = (): any => {
  const module = QuickPickEntries.get(state.provider)
  // @ts-ignore
  return module.getNoResults()
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
  const module = QuickPickEntries.get(state.provider)

  // @ts-ignore
  return module.getPickFilterValue(pick)
}

export const getPickDescription = (pick: any): any => {
  const module = QuickPickEntries.get(state.provider)

  // @ts-ignore
  if (module.getPickDescription) {
    // @ts-ignore
    return module.getPickDescription(pick)
  }
  return ''
}

export const getPickLabel = (pick: any): any => {
  const module = QuickPickEntries.get(state.provider)
  // @ts-ignore
  return module.getPickLabel(pick)
}

export const getPickIcon = (pick: any): string => {
  const module = QuickPickEntries.get(state.provider)
  // @ts-ignore
  return module.getPickIcon(pick)
}

export const getPickFileIcon = (pick: any): any => {
  const module = QuickPickEntries.get(state.provider)
  // @ts-ignore
  if (module.getPickFileIcon) {
    // @ts-ignore
    return module.getPickFileIcon(pick)
  }
  return undefined
}

export const isPrepared = (): boolean => {
  const module = QuickPickEntries.get(state.provider)
  // @ts-ignore
  if (module.isPrepared) {
    // @ts-ignore
    return module.isPrepared()
  }
  return false
}

// provider
// - create
// - loadcontent
// - filter
// - getVisible

// matches could be in loadcontent or getVisible

export { state } from '../GetVisibleItemsQuickPickEntriesEverything/GetVisibleItemsQuickPickEntriesEverything.ts'

export { getPicks } from '../GetPicksEverything/GetPicksEverything.ts'

export { selectPick } from '../SelectPickEverything/SelectPickEverything.ts'
