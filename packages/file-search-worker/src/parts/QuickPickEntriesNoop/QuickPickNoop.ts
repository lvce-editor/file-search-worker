import * as GetVisibleItemsQuickPickEntriesNoop from '../GetVisibleItemsQuickPickEntriesNoop/GetVisibleItemsQuickPickEntriesNoop.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const name = 'noop'

export const getPlaceholder = (): string => {
  return ''
}

export const getNoResults = (): any => {
  return QuickPickStrings.noResults()
}

export const getPicks = async (value: any): Promise<any[]> => {
  return []
}

export const selectPick = async (item: any): Promise<any> => {
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const getFilterValue = (value: any): any => {
  return value
}

export const getPickFilterValue = (pick: any): any => {
  return pick
}

export const getVisibleItems = GetVisibleItemsQuickPickEntriesNoop.getVisibleItems
