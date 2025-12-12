import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import { setCursor } from '../SetCursor/SetCursor.ts'

export const selectPick = async (item: any): Promise<SelectPickResult> => {
  const rowIndex = Number.parseInt(item.label)
  const columnIndex = 5
  await setCursor(rowIndex, columnIndex)
  return {
    command: QuickPickReturnValue.Hide,
  }
}
