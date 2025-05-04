import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const searchFile = async (uri: string): Promise<readonly string[]> => {
  return Rpc.invoke('ExtensionHost.searchFileWithHtml', uri)
}
