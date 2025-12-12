import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import { getText } from '../GetText/GetText.ts'

const toPick = (column: number): ProtoVisibleItem => {
  return {
    description: '',
    direntType: DirentType.None,
    fileIcon: '',
    icon: '',
    label: `${column}`,
    matches: [],
    uri: '',
  }
}

export const getPicks = async (value: string): Promise<readonly ProtoVisibleItem[]> => {
  if (value.startsWith('::')) {
    const text = await getText()
    const columns = [...Array(text.length).fill(0)].map((item, index) => index)
    const picks: readonly ProtoVisibleItem[] = columns.map(toPick)
    return picks
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
