import * as Command from '../Command/Command.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const name = 'goToLine'

export const getPlaceholder = () => {
  return ''
}

export const getHelpEntries = () => {
  return []
}

export const getNoResults = () => {
  return undefined
}

export const getPicks = async () => {
  const picks = [
    {
      label: '1',
    },
    {
      label: '2',
    },
    {
      label: '3',
    },
    {
      label: '4',
    },
    {
      label: '5',
    },
    {
      label: '6',
    },
  ]
  return picks
}

export const selectPick = async (item: any) => {
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

export const getFilterValue = (value: any) => {
  return value
}
