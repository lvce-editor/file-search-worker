import * as GetColorThemeNames from '../GetColorThemeNames/GetColorThemeNames.ts'

export const getPicks = async (searchValue: string): Promise<readonly any[]> => {
  const colorThemeNames = await GetColorThemeNames.getColorThemeNames()
  return colorThemeNames
}
