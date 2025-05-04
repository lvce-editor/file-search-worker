import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const setColorTheme = (id: string): Promise<void> => {
  return Rpc.invoke(/* ColorTheme.setColorTheme */ 'ColorTheme.setColorTheme', /* colorThemeId */ id)
}
