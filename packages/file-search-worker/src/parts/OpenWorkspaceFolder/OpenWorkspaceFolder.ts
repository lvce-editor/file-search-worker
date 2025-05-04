import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const openWorkspaceFolder = (uri: string): Promise<void> => {
  return Rpc.invoke(/* Workspace.setPath */ 'Workspace.setPath', /* path */ uri)
}
