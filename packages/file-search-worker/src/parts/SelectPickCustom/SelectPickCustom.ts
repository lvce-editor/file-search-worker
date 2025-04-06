import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (pick: ProtoVisibleItem): Promise<SelectPickResult> => {
  const { args } = state
  const resolve = args[2]
  resolve(pick)
  return {
    command: QuickPickReturnValue.Hide,
  }
}
