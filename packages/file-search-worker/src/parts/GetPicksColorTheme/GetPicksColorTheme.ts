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

export const getPicks = async (searchValue: string, args: any): Promise<readonly ProtoVisibleItem[]> => {
  if (!args || !Array.isArray(args)) {
    args = ['', 0]
  }
  const platform = args.at(-1)
  const assetDir = args.at(-2)
  const colorThemeNames = await GetColorThemeNames.getColorThemeNames(assetDir, platform)
  const picks = colorThemeNames.map(toProtoVisibleItem)
  return picks
}
