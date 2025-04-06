import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'

export const getPicks = async (searchValue: string): Promise<readonly ProtoVisibleItem[]> => {
  const items = state.args[1] || []
  return items
}
