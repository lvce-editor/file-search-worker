import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import * as Command from '../Command/Command.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (item: any): Promise<SelectPickResult> => {
  const rowIndex = Number.parseInt(item.label)
  const position = {
    columnIndex: 5,
    rowIndex,
  }
  await Command.execute(/* EditorSetCursor.editorSetCursor */ 'TODO', /* position */ position)
  // TODO put cursor onto that line
  return {
    command: QuickPickReturnValue.Hide,
  }
}
