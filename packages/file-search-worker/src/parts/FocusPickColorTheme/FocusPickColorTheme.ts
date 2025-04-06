import * as SetColorTheme from '../SetColorTheme/SetColorTheme.ts'

export const focusPick = async (pick: any): Promise<void> => {
  await SetColorTheme.setColorTheme(/* colorThemeId */ pick)
}
