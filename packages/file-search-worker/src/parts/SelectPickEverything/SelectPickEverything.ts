import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import { state } from '../GetVisibleItemsQuickPickEntriesEverything/GetVisibleItemsQuickPickEntriesEverything.ts'

export const selectPick = (item: ProtoVisibleItem): Promise<any> => {
  const { provider } = state
  return provider.selectPick(item)
}
