import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'

export interface IGetPicks {
  (value: string, args: readonly unknown[], { assetDir, platform }: { assetDir: string; platform: number }): Promise<readonly ProtoVisibleItem[]>
}

<<<<<<< HEAD
export const getPicks = (id: number, searchValue: string, args: readonly unknown[]): Promise<readonly ProtoVisibleItem[]> => {
  console.log({ id, searchValue })
=======
export const getPicks = (
  id: number,
  searchValue: string,
  args: readonly unknown[],
  { assetDir, platform }: { assetDir: string; platform: number },
): Promise<readonly ProtoVisibleItem[]> => {
>>>>>>> origin/main
  const fn = QuickPickEntries.getPicks(id)
  return fn(searchValue, args, { assetDir, platform })
}
