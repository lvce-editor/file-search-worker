import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const name = 'number'

export const getPlaceholder = (): string => {
  return ''
}

export const getHelpEntries = (): any[] => {
  return []
}

export const getNoResults = (): any => {
  return {
    label: QuickPickStrings.noMatchingResults(),
  }
}

export const getPicks = async (): Promise<any[]> => {
  const picks = [
    {
      label: '1',
    },
    {
      label: '2',
    },
    {
      label: '3',
    },
    {
      label: '4',
    },
    {
      label: '5',
    },
    {
      label: '6',
    },
    {
      label: '7',
    },
    {
      label: '8',
    },
    {
      label: '9',
    },
    {
      label: '10',
    },
  ]
  return picks
}

export const selectPick = async (item: any): Promise<any> => {
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const state = {}

export const getPickFilterValue = (value: string): string => {
  return value
}

export const getFilterValue = (value: string): string => {
  return value
}

export const getPickDescription = (value: any): string => {
  return ''
}

export const getPickLabel = (value: string): string => {
  return value
}

export const getPickIcon = (value: string): string => {
  return ''
}

export const isPrepared = (): boolean => {
  return false
}
