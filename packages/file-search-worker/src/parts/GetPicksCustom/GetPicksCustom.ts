import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustom.ts'

export const getPicks = async (searchValue: any): Promise<readonly any[]> => {
  const items = state.args[1] || []
  return items
}
