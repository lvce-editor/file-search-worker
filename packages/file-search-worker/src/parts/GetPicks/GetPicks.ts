import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'

export interface GetPicks {
  (value: string, args: readonly unknown[]): Promise<readonly ProtoVisibleItem[]>
}

export const getPicks = (id: number, searchValue: string, args: readonly unknown[]): Promise<readonly ProtoVisibleItem[]> => {
  console.log({ id, searchValue })
  const fn = QuickPickEntries.getPicks(id)
  return fn(searchValue, args)
}
