import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.js'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.js'

export const name = 'workspace-symbol'

export const getPlaceholder = () => {
  return ''
}

export const getHelpEntries = () => {
  return []
}

export const getNoResults = () => {
  return {
    label: ViewletQuickPickStrings.noWorkspaceSymbolsFound(),
  }
}

export const getPicks = async () => {
  const picks: any[] = []
  return picks
}

export const selectPick = async (item: any) => {
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const getFilterValue = (value: any) => {
  return value
}
