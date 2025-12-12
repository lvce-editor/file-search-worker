import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getColorThemeNames = async (): Promise<readonly string[]> => {
  return RendererWorker.invoke(/* Ajax.getJson */ 'ColorTheme.getColorThemeNames')
}
