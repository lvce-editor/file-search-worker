import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'

export interface GetPicks {
  (value: string): Promise<readonly ProtoVisibleItem[]>
}

export const getPicks = (id: number, searchValue: string): Promise<readonly ProtoVisibleItem[]> => {
  const fn = QuickPickEntries.getPicks(id)
  return fn(searchValue)
}
