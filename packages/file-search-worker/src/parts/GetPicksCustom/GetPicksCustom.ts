import type { Pick } from '../Pick/Pick.ts'
import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustom.ts'

export const getPicks = async (searchValue: any): Promise<readonly Pick[]> => {
  const items = state.args[1] || []
  return items
}
