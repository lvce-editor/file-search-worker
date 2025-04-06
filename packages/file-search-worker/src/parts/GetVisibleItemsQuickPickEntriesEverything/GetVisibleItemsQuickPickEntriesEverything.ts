import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import * as QuickPickNoop from '../QuickPickEntriesNoop/QuickPickNoop.ts'

export const state = {
  provider: QuickPickNoop as any as QuickPickEntriesModule,
  prefix: 'string-that-should-never-match-another-string',
}

export const getVisibleItems = (picks: readonly ProtoVisibleItem[], icons: readonly string[]): readonly ProtoVisibleItem[] => {
  const visibleItems = state.provider.getVisibleItems(picks, icons)
  return visibleItems
}
