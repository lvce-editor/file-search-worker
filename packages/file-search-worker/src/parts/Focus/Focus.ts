import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const setFocus = async (focusKey: number): Promise<void> => {
  await Rpc.invoke('Focus.setFocus', focusKey)
}
