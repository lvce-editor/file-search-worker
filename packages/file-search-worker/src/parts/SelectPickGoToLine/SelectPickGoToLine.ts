import * as Command from '../Command/Command.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (item: any): Promise<any> => {
  const rowIndex = Number.parseInt(item.label)
  const position = {
    rowIndex,
    columnIndex: 5,
  }
  await Command.execute(/* EditorSetCursor.editorSetCursor */ 'TODO', /* position */ position)
  // TODO put cursor onto that line
  return {
    command: QuickPickReturnValue.Hide,
  }
}
