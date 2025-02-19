import * as ParentRpc from '../Rpc/Rpc.ts'

export const closeWidget = async (id: number): Promise<void> => {
  await ParentRpc.invoke('Viewlet.closeWidget', id)
}
