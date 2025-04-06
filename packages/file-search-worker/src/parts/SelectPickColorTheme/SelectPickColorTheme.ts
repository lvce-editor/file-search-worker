import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as SetColorTheme from '../SetColorTheme/SetColorTheme.ts'

export const selectPick = async (pick: any): Promise<any> => {
  await SetColorTheme.setColorTheme(/* colorThemeId */ pick)
  return {
    command: QuickPickReturnValue.Hide,
  }
}
