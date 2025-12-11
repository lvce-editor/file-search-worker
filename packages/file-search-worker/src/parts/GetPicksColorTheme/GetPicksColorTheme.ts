import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as GetColorThemeNames from '../GetColorThemeNames/GetColorThemeNames.ts'

const toProtoVisibleItem = (name: string): ProtoVisibleItem => {
  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: name,
    matches: [],
    uri: '',
  }
  return pick
}

export const getPicks = async (searchValue: string): Promise<readonly ProtoVisibleItem[]> => {
  const colorThemeNames = await GetColorThemeNames.getColorThemeNames()
  const picks = colorThemeNames.map(toProtoVisibleItem)
  return picks
}
