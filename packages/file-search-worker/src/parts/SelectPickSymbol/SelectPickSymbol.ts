import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (item: ProtoVisibleItem): Promise<any> => {
  return {
    command: QuickPickReturnValue.Hide,
  }
}
