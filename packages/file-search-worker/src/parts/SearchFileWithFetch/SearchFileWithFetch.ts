import * as Rpc from '../Rpc/Rpc.ts'

// TODO simplify code
// 1. don't have playground prefix in fileMap json
// 2. remove code here that removes the prefix
export const searchFile = async (path: string): Promise<readonly string[]> => {
  return Rpc.invoke('ExtensionHost.searchFileWithFetch', path)
}
