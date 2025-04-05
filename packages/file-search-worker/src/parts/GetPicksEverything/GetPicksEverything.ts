import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as GetQuickPickProviderId from '../GetQuickPickProviderId/GetQuickPickProviderId.ts'
import { state } from '../GetVisibleItemsQuickPickEntriesEverything/GetVisibleItemsQuickPickEntriesEverything.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'

export const getPicks = async (value: any): Promise<readonly any[]> => {
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)

  // TODO race condition
  if (state.prefix !== prefix) {
    state.prefix = prefix
    const providerId = GetQuickPickProviderId.getQuickPickProviderId(prefix)
    const provider = QuickPickEntries.get(providerId)
    state.provider = provider
  }
  // TODO this line is a bit duplicated with getFilterValue
  const slicedValue = value.slice(prefix.length).trimStart()
  const picks = await state.provider.getPicks(slicedValue)
  return picks
}
