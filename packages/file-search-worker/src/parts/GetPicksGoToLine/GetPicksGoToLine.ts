import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getPicks = async (): Promise<readonly ProtoVisibleItem[]> => {
  const picks: readonly ProtoVisibleItem[] = [
    {
      label: '1',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
    },
    {
      label: '2',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
    },
    {
      label: '3',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
    },
    {
      label: '4',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
    },
    {
      label: '5',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
    },
    {
      label: '6',
      description: '',
      icon: '',
      fileIcon: '',
      matches: [],
    },
  ]
  return picks
}
