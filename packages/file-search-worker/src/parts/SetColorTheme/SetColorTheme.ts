import * as Rpc from '../Rpc/Rpc.ts'

export const setColorTheme = (id: string): Promise<void> => {
  return Rpc.invoke(/* ColorTheme.setColorTheme */ 'ColorTheme.setColorTheme', /* colorThemeId */ id)
}
