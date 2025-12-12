import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import { getText } from '../GetText/GetText.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import { setCursor } from '../SetCursor/SetCursor.ts'

const getPosition = (text: string, wantedColumn: number): any => {
  let row = 0
  let column = 0
  for (let i = 0; i < wantedColumn; i++) {
    if (text[i] === '\n') {
      row++
      column = 0
    } else {
      column++
    }
  }
  return {
    column,
    row,
  }
}

const goToPositionAndFocus = async (rowIndex: number, columnIndex: number): Promise<void> => {
  await setCursor(rowIndex, columnIndex)
  await RendererWorker.invoke('Editor.handleFocus')
}

export const selectPick = async (item: any, value: string): Promise<SelectPickResult> => {
  if (value.startsWith('::')) {
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
