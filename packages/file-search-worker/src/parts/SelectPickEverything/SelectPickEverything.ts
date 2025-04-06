import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import { state } from '../GetVisibleItemsQuickPickEntriesEverything/GetVisibleItemsQuickPickEntriesEverything.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'

export const selectPick = (item: ProtoVisibleItem): Promise<SelectPickResult> => {
  const { provider } = state
  const fn = QuickPickEntries.getSelect(provider)
  return fn(item)
}
