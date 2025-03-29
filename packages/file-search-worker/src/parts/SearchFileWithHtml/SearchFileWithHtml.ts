import * as Rpc from '../Rpc/Rpc.ts'

export const searchFile = async (uri: string): Promise<readonly string[]> => {
  return Rpc.invoke('ExtensionHost.searchFileWithHtml', uri)
}
