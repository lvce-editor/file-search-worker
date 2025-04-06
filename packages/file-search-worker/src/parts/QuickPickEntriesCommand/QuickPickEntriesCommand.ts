import * as GetVisibleItemsQuickPickEntriesCommand from '../GetVisibleItemsQuickPickEntriesCommand/GetVisibleItemsQuickPickEntriesCommand.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const name = 'command'

export const state = {}

export const isPrepared = (): boolean => {
  return false
}

export const getPickDescription = (): string => {
  return ''
}

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

export const getVisibleItems = GetVisibleItemsQuickPickEntriesCommand.getVisibleItems

const shouldHide = (item: any): boolean => {
  if (item.id === 'Viewlet.openWidget' && item.args[0] === 'QuickPick') {
    return false
  }
  return true
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

export { getPicks } from '../GetPicksCommand/GetPicksCommand.ts'

export { selectPick } from '../SelectPickCommand/SelectPickCommand.ts'
