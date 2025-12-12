import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import { getPosition } from '../GetPosition/GetPosition.ts'
import { getText } from '../GetText/GetText.ts'

export const getPicks = async (value: string): Promise<readonly ProtoVisibleItem[]> => {
  console.log({ value })
  if (value === '::') {
    const text = await getText()
    console.log({ text })
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
  if (value.startsWith('::')) {
    const columnString = value.slice(2)
    const wantedColumn = Number.parseInt(columnString, 10)
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
