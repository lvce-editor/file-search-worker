import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const setColorTheme = (id: string): Promise<void> => {
  return RendererWorker.invoke(/* ColorTheme.setColorTheme */ 'ColorTheme.setColorTheme', /* colorThemeId */ id)
}
