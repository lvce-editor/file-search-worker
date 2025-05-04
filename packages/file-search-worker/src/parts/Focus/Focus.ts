import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const setFocus = async (focusKey: number): Promise<void> => {
  await Rpc.invoke('Focus.setFocus', focusKey)
}
