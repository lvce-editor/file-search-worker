import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const getColorThemeNames = async (): Promise<readonly string[]> => {
  return Rpc.invoke(/* Ajax.getJson */ 'ColorTheme.getColorThemeNames')
}
