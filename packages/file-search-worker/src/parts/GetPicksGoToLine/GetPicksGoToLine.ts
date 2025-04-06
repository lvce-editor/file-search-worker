import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'

export const getPicks = async (): Promise<readonly ProtoVisibleItem[]> => {
  const picks: readonly ProtoVisibleItem[] = [
    {
      label: '1',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
      direntType: DirentType.None,
      uri: '',
    },
    {
      label: '2',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
      direntType: DirentType.None,
      uri: '',
    },
    {
      label: '3',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
      direntType: DirentType.None,
      uri: '',
    },
    {
      label: '4',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
      direntType: DirentType.None,
      uri: '',
    },
    {
      label: '5',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
      direntType: DirentType.None,
      uri: '',
    },
    {
      label: '6',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
      direntType: DirentType.None,
      uri: '',
    },
  ]
  return picks
}
