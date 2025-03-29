import * as QuickPickEntriesCommand from '../QuickPickEntriesCommand/QuickPickEntriesCommand.ts'
import * as QuickPickEntriesFile from '../QuickPickEntriesFile/QuickPickEntriesFile.ts'
import * as QuickPickEntriesGoToLine from '../QuickPickEntriesGoToLine/QuickPickEntriesGoToLine.ts'
import * as QuickPickNoop from '../QuickPickEntriesNoop/QuickPickNoop.ts'
import * as QuickPickEntriesSymbol from '../QuickPickEntriesSymbol/QuickPickEntriesSymbol.ts'
import * as QuickPickEntriesView from '../QuickPickEntriesView/QuickPickEntriesView.ts'
import * as QuickPickEntriesWorkspaceSymbol from '../QuickPickEntriesWorkspaceSymbol/QuickPickEntriesWorkspaceSymbol.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

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

export const getHelpEntries = (): any[] => {
  return state.provider.getHelpEntries()
}

export const getNoResults = (): any => {
  return state.provider.getNoResults()
}

const getPrefix = (value: any): string => {
  if (value.startsWith(QuickPickPrefix.Command)) {
    return QuickPickPrefix.Command
  }
  if (value.startsWith(QuickPickPrefix.Symbol)) {
    return QuickPickPrefix.Symbol
  }
  if (value.startsWith(QuickPickPrefix.WorkspaceSymbol)) {
    return QuickPickPrefix.WorkspaceSymbol
  }
  if (value.startsWith(QuickPickPrefix.GoToLine)) {
    return QuickPickPrefix.GoToLine
  }
  if (value.startsWith(QuickPickPrefix.View)) {
    return QuickPickPrefix.View
  }
  return QuickPickPrefix.None
}

const getQuickPickProvider = (prefix: string): any => {
  // TODO could use enum for prefix
  // TODO could use regex to extract prefix
  // TODO or could check first letter char code (less comparisons)
  switch (prefix) {
    case QuickPickPrefix.Command:
      return QuickPickEntriesCommand
    case QuickPickPrefix.Symbol:
      return QuickPickEntriesSymbol
    case QuickPickPrefix.WorkspaceSymbol:
      return QuickPickEntriesWorkspaceSymbol
    case QuickPickPrefix.GoToLine:
      return QuickPickEntriesGoToLine
    case QuickPickPrefix.View:
      return QuickPickEntriesView
    default:
      return QuickPickEntriesFile
  }
}

export const getPicks = async (value: any): Promise<readonly any[]> => {
  const prefix = getPrefix(value)

  // TODO race condition
  if (state.prefix !== prefix) {
    state.prefix = prefix
    // @ts-ignore
    state.provider = await getQuickPickProvider(prefix)
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

export const getFilterValue = (value: any): any => {
  return value.slice(state.prefix.length)
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
