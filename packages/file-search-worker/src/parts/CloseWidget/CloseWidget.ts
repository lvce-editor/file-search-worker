import * as ParentRpc from '../RendererWorker/RendererWorker.ts'

export const closeWidget = async (id: number): Promise<void> => {
  await ParentRpc.invoke('Viewlet.closeWidget', id)
}
