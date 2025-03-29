import * as Rpc from '../Rpc/Rpc.ts'

export const setFocus = async (focusKey: number): Promise<void> => {
  await Rpc.invoke('Focus.setFocus', focusKey)
}
