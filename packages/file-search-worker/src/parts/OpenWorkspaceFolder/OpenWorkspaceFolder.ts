import * as Rpc from '../Rpc/Rpc.ts'

export const openWorkspaceFolder = (uri: string): Promise<void> => {
  return Rpc.invoke(/* Workspace.setPath */ 'Workspace.setPath', /* path */ uri)
}
