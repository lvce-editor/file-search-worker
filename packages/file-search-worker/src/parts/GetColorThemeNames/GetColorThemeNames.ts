import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getColorThemeNames = async (): Promise<readonly string[]> => {
  return RendererWorker.invoke(/* Ajax.getJson */ 'ColorTheme.getColorThemeNames')
}
