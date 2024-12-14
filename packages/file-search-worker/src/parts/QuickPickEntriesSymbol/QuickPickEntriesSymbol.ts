import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const name = 'symbol'

export const getPlaceholder = (): string => {
  return ''
}

export const getHelpEntries = (): any[] => {
  return []
}

export const getNoResults = (): any => {
  return {
    label: QuickPickStrings.noSymbolFound(),
  }
}

export const getPicks = async (): Promise<any[]> => {
  const picks: any = []
  return picks
}

export const selectPick = async (item: any): Promise<any> => {
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const getFilterValue = (value: any): any => {
  return value
}
