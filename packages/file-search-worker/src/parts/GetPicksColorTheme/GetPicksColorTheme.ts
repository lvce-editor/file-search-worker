import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as GetColorThemeNames from '../GetColorThemeNames/GetColorThemeNames.ts'

const toProtoVisibleItem = (name: string): ProtoVisibleItem => {
  const pick: ProtoVisibleItem = {
    label: name,
    description: '',
    fileIcon: '',
    icon: '',
    matches: [],
    direntType: 0,
    uri: '',
  }
  return pick
}

export const getPicks = async (searchValue: string): Promise<readonly ProtoVisibleItem[]> => {
  const colorThemeNames = await GetColorThemeNames.getColorThemeNames()
  const picks = colorThemeNames.map(toProtoVisibleItem)
  return picks
}
