import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import { getPosition } from '../GetPosition/GetPosition.ts'
import { getText } from '../GetText/GetText.ts'
import { goToPositionAndFocus } from '../GoToPositionAndFocus/GoToPositionAndFocus.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (item: any, value: string): Promise<SelectPickResult> => {
  if (value.startsWith(QuickPickPrefix.GoToColumn)) {
    const columnString = value.slice(2)
    const wantedColumn = Number.parseInt(columnString, 10)
    const text = await getText()
    const position = getPosition(text, wantedColumn)
    await goToPositionAndFocus(position.row, position.column)
    return {
      command: QuickPickReturnValue.Hide,
    }
  }
  const rowIndex = Number.parseInt(item.label)
  const columnIndex = 0
  await goToPositionAndFocus(rowIndex, columnIndex)
  return {
    command: QuickPickReturnValue.Hide,
  }
}
