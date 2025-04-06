import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getPlaceholder = (): string => {
  return QuickPickStrings.selectColorTheme()
}

export const getLabel = (): string => {
  return QuickPickStrings.selectColorTheme()
}

export const getFilterValue = (value: any): any => {
  return value
}

export const getNoResults = (): any => {
  return {
    label: QuickPickStrings.noMatchingColorThemesFound(),
  }
}

export const getPickFilterValue = (pick: any): any => {
  return pick
}

export const getPickLabel = (pick: any): string => {
  return pick
}

export const getPickIcon = (pick: any): string => {
  return ''
}

export const state = {}

export const getPickDescription = (value: any): string => {
  return ''
}

export const isPrepared = (): boolean => {
  return false
}

export const name = ''

export const getHelpEntries = (): readonly any[] => {
  return []
}

export { getPicks } from '../GetPicksColorTheme/GetPicksColorTheme.ts'

export { selectPick } from '../SelectPickColorTheme/SelectPickColorTheme.ts'

export { focusPick } from '../FocusPickColorTheme/FocusPickColorTheme.ts'
