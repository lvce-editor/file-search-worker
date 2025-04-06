import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustom.ts'

export const getPicks = async (searchValue: any): Promise<readonly ProtoVisibleItem[]> => {
  const items = state.args[1] || []
  return items
}
