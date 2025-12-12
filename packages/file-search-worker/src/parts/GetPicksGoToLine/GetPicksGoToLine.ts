import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import { getPosition } from '../GetPosition/GetPosition.ts'
import { getText } from '../GetText/GetText.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

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

export const getPicks = async (value: string): Promise<readonly ProtoVisibleItem[]> => {
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
        label: `Press 'Enter' to go to line ${position.row} column ${position.column}`,
        matches: [],
        uri: '',
      },
    ]
  }
  const picks: readonly ProtoVisibleItem[] = [
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '1',
      matches: [],
      uri: '',
    },
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '2',
      matches: [],
      uri: '',
    },
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '3',
      matches: [],
      uri: '',
    },
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '4',
      matches: [],
      uri: '',
    },
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '5',
      matches: [],
      uri: '',
    },
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '6',
      matches: [],
      uri: '',
    },
  ]
  return picks
}
