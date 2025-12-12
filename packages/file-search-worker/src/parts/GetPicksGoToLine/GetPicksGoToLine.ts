import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'

export const getPicks = async (value: string): Promise<readonly ProtoVisibleItem[]> => {
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
