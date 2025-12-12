import { RendererWorker } from '@lvce-editor/rpc-registry'

export const invoke = (method: string, ...params: readonly any[]): Promise<any> => {
  return RendererWorker.invoke('SearchProcess.invoke', method, ...params)
}
