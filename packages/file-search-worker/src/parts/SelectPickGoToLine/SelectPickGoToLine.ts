import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import { goToPositionAndFocus } from '../GoToPositionAndFocus/GoToPositionAndFocus.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (item: any, value: string): Promise<SelectPickResult> => {
  const rowIndex = Number.parseInt(item.label)
  const columnIndex = 0
  await goToPositionAndFocus(rowIndex, columnIndex)
  return {
    command: QuickPickReturnValue.Hide,
  }
}
