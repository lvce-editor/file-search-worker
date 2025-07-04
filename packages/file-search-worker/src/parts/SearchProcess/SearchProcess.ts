import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const invoke = (method: string, ...params: readonly any[]): Promise<any> => {
  return RendererWorker.invoke('SearchProcess.invoke', method, ...params)
}
