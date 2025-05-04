import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const getWorkspacePath = async (): Promise<string> => {
  return Rpc.invoke('Workspace.getPath')
}
