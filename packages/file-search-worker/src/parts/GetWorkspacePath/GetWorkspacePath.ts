import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getWorkspacePath = async (): Promise<string> => {
  return RendererWorker.invoke('Workspace.getPath')
}
