import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const openWorkspaceFolder = (uri: string): Promise<void> => {
  return RendererWorker.invoke(/* Workspace.setPath */ 'Workspace.setPath', /* path */ uri)
}
