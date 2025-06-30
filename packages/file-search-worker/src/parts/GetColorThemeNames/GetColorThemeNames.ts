import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const getColorThemeNames = async (): Promise<readonly string[]> => {
  return Rpc.invoke(/* Ajax.getJson */ 'ColorTheme.getColorThemeNames')
}
