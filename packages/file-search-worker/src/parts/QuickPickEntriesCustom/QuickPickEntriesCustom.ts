import * as Icon from '../Icon/Icon.ts'
import * as IconType from '../IconType/IconType.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const name = 'custom'

export const state = {
  args: [] as readonly any[],
}

export const setArgs = (args: readonly any[]): void => {
  state.args = args
}

export const getPlaceholder = (): string => {
  return ''
}

export const getLabel = (): string => {
  return 'Custom'
}

// TODO help entries should not be here
export const getHelpEntries = (): any[] => {
  return []
}

export const getNoResults = (): any => {
  return {
    label: QuickPickStrings.noMatchingResults(),
  }
}

export const getPicks = async (searchValue: any): Promise<any[]> => {
  const items = state.args[1] || []
  return items
}

export const selectPick = async (pick: any): Promise<any> => {
  const { args } = state
  const resolve = args[2]
  resolve(pick)
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

export const getPickLabel = (pick: any): any => {
  return pick.label
}

export const getPickDescription = (pick: any): string => {
  return pick.description || ''
}

const convertIcon = (icon: any): string => {
  switch (icon) {
    case IconType.SourceControl:
      return Icon.SourceControl
    case IconType.Cloud:
      return Icon.Cloud
    case IconType.Tag:
      return Icon.Tag
    default:
      return Icon.None
  }
}

export const getPickIcon = (pick: any): string => {
  return convertIcon(pick.icon)
}
