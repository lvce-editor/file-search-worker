import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const searchFile = async (uri: string): Promise<readonly string[]> => {
  return Rpc.invoke('ExtensionHost.searchFileWithMemory', uri)
}
