import * as Rpc from '../Rpc/Rpc.ts'

export const getWorkspacePath = async (): Promise<string> => {
  return Rpc.invoke('Workspace.getPath')
}
