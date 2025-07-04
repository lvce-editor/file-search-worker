import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const openUri = async (uri: string): Promise<void> => {
  await RendererWorker.openUri(uri)
}
