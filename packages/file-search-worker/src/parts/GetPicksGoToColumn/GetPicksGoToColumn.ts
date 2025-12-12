import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import { getPosition } from '../GetPosition/GetPosition.ts'
import { getText } from '../GetText/GetText.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

const getPicksGoToColumnBase = async (): Promise<readonly ProtoVisibleItem[]> => {
  const text = await getText()
  return [
    {
      description: '',
      direntType: 0,
      fileIcon: '',
      icon: '',
      label: `Type a character position to go to (from 1 to ${text.length})`,
      matches: [],
      uri: '',
    },
  ]
}

export const getPicksGoToColumn = async (value: string): Promise<readonly ProtoVisibleItem[]> => {
  if (value === QuickPickPrefix.GoToColumn) {
    return getPicksGoToColumnBase()
  }
  if (value.startsWith(QuickPickPrefix.GoToColumn)) {
    const columnString = value.slice(2)
    const wantedColumn = Number.parseInt(columnString, 10)
    if (Number.isNaN(wantedColumn)) {
      return getPicksGoToColumnBase()
    }
    const text = await getText()
    const position = getPosition(text, wantedColumn)
    return [
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: QuickPickStrings.pressEnterToGoToLine(position.row, position.column),
        matches: [],
        uri: '',
      },
    ]
  }
  return []
}
