import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const closeWidget = async (id: number): Promise<void> => {
  await RendererWorker.invoke('Viewlet.closeWidget', id)
}
