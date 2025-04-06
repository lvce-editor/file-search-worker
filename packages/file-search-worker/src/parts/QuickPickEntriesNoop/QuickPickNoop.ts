import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const name = 'noop'

export const getPlaceholder = (): string => {
  return ''
}

export const getNoResults = (): any => {
  return QuickPickStrings.noResults()
}

export const getFilterValue = (value: any): any => {
  return value
}

export const getPickFilterValue = (pick: any): any => {
  return pick
}
