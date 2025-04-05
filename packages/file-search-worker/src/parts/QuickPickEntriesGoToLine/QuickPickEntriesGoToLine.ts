import * as Command from '../Command/Command.ts'
import * as GetVisibleItemsQuickPickEntriesGoToLine from '../GetVisibleItemsQuickPickEntriesGoToLine/GetVisibleItemsQuickPickEntriesGoToLine.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const name = 'goToLine'

export const state = {}

export const getPickFilterValue = (): string => {
  return ''
}

export const getPickDescription = (): string => {
  return ''
}

export const getPickIcon = (): string => {
  return ''
}

export const isPrepared = (): boolean => {
  return false
}

export const getPickLabel = (): string => {
  return ''
}

export const getPlaceholder = (): string => {
  return ''
}

export const getHelpEntries = (): any[] => {
  return []
}

export const getNoResults = (): any => {
  return undefined
}

export const getPicks = async (): Promise<any[]> => {
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

export const getFilterValue = (value: any): string => {
  return value
}

export const getVisibleItems = GetVisibleItemsQuickPickEntriesGoToLine.getVisibleItems
