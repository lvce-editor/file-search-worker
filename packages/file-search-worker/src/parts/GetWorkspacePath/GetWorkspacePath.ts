import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const getWorkspacePath = async (): Promise<string> => {
  return Rpc.invoke('Workspace.getPath')
}
