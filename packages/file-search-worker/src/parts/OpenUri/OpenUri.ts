import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const openUri = async (uri: string): Promise<void> => {
  await Rpc.openUri(uri)
}
