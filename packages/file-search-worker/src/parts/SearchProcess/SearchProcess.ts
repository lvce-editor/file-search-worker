import { RendererWorker } from '@lvce-editor/rpc-registry'

export const invoke = (method: string, ...params: readonly unknown[]): Promise<unknown> => {
  return RendererWorker.invoke('SearchProcess.invoke', method, ...params)
}
