import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import { setCursor } from '../SetCursor/SetCursor.ts'

export const selectPick = async (item: any): Promise<SelectPickResult> => {
  const rowIndex = Number.parseInt(item.label)
  const columnIndex = 0
  await setCursor(rowIndex, columnIndex)
  await RendererWorker.invoke('Editor.handleFocus')
  return {
    command: QuickPickReturnValue.Hide,
  }
}
