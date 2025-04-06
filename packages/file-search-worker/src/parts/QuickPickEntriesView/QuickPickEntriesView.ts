import * as GetVisibleItemsQuickPickEntriesView from '../GetVisibleItemsQuickPickEntriesView/GetVisibleItemsQuickPickEntriesView.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

// TODO probably not needed

export const getPlaceholder = (): any => {
  return ViewletQuickPickStrings.typeNameofCommandToRun()
}

export const getHelpEntries = (): any => {
  return undefined
}

export const getPicks = async (): Promise<any> => {
  // const views = ViewService.getViews()
  // const picks = views.map(toPick)
  // return picks
  return []
}

export const getFilterValue = (value: any): string => {
  return value
}

export const getPickFilterValue = (value: string): string => {
  return value
}

export const getPickLabel = (value: string): string => {
  return value
}

export const getPickIcon = (value: string): string => {
  return ''
}

export const state = {}

export const getNoResults = (): string => {
  return ''
}

export const name = ''

export const isPrepared = (): boolean => {
  return true
}

export const getPickDescription = (): string => {
  return ''
}

export const getVisibleItems = GetVisibleItemsQuickPickEntriesView.getVisibleItems

export { selectPick } from '../SelectPickView/SelectPickView.ts'
