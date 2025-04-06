import * as GetVisibleItemsQuickPickEntriesWorkspaceSymbol from '../GetVisibleItemsQuickPickEntriesWorkspaceSymbol/GetVisibleItemsQuickPickEntriesWorkspaceSymbol.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const name = 'workspace-symbol'

export const getPlaceholder = (): string => {
  return ''
}

export const state = {}

export const getPickIcon = (): string => {
  return ''
}

export const isPrepared = (): boolean => {
  return false
}

export const getPickLabel = (): string => {
  return ''
}

export const getPickFilterValue = (): string => {
  return ''
}

export const getPickDescription = (): string => {
  return ''
}

export const getNoResults = (): any => {
  return {
    label: ViewletQuickPickStrings.noWorkspaceSymbolsFound(),
  }
}

export const getPicks = async (): Promise<any[]> => {
  const picks: any[] = []
  return picks
}

export const getFilterValue = (value: any): string => {
  return value
}

export const getVisibleItems = GetVisibleItemsQuickPickEntriesWorkspaceSymbol.getVisibleItems

export { selectPick } from '../SelectPickWorkspaceSymbol/SelectPickWorkspaceSymbol.ts'
