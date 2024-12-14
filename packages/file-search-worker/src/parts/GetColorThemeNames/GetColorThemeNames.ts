import * as Rpc from '../Rpc/Rpc.ts'

export const getColorThemeNames = async (): Promise<any[]> => {
  return Rpc.invoke(/* Ajax.getJson */ 'ColorTheme.getColorThemeNames')
}
