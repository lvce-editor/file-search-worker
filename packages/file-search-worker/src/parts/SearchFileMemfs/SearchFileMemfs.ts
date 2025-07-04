import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const searchFile = async (uri: string): Promise<readonly string[]> => {
  return RendererWorker.invoke('ExtensionHost.searchFileWithMemory', uri)
}
