import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as GetPicks from '../GetPicks/GetPicks.ts'
import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as GetQuickPickProviderId from '../GetQuickPickProviderId/GetQuickPickProviderId.ts'
import { state } from '../GetVisibleItemsQuickPickEntriesEverything/GetVisibleItemsQuickPickEntriesEverything.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'

export const getPicks = async (value: string): Promise<readonly ProtoVisibleItem[]> => {
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)
  const providerId = GetQuickPickProviderId.getQuickPickProviderId(prefix)

  // TODO race condition
  if (state.prefix !== prefix) {
    state.prefix = prefix
    const provider = QuickPickEntries.get(providerId)
    state.provider = provider
  }
  // TODO this line is a bit duplicated with getFilterValue
  const slicedValue = value.slice(prefix.length).trimStart()
  const picks = await GetPicks.getPicks(providerId, slicedValue)
  return picks
}
