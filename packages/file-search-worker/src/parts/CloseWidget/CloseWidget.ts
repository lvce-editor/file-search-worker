import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const closeWidget = async (id: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.closeWidget(id)
}
