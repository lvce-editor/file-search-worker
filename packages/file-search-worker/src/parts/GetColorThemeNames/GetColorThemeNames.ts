import * as Rpc from '../Rpc/Rpc.ts'

export const getColorThemeNames = async (): Promise<readonly string[]> => {
  return Rpc.invoke(/* Ajax.getJson */ 'ColorTheme.getColorThemeNames')
}
