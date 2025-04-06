import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as GetRecentlyOpened from '../GetRecentlyOpened/GetRecentlyOpened.ts'

const toProtoVisibleItem = (uri: string): ProtoVisibleItem => {
  return {
    label: uri,
    description: '',
    fileIcon: '',
    icon: '',
    matches: [],
    direntType: DirentType.Directory,
    uri: uri,
  }
}

export const getPicks = async (): Promise<readonly ProtoVisibleItem[]> => {
  const recentlyOpened = await GetRecentlyOpened.getRecentlyOpened()
  const picks = recentlyOpened.map(toProtoVisibleItem)
  return picks
}
