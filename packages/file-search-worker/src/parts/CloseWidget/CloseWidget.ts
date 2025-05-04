import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const closeWidget = async (id: number): Promise<void> => {
  await ParentRpc.invoke('Viewlet.closeWidget', id)
}
