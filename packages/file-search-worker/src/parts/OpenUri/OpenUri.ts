import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const openUri = async (uri: string): Promise<void> => {
  await Rpc.invoke(/* Main.openUri */ 'Main.openUri', /* uri */ uri)
}
