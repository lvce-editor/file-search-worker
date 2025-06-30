import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const invoke = (method: string, ...params: readonly any[]): Promise<any> => {
  return Rpc.invoke('SearchProcess.invoke', method, ...params)
}
