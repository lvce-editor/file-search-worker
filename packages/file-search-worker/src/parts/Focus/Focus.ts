import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const setFocus = async (focusKey: number): Promise<void> => {
  await RendererWorker.invoke('Focus.setFocus', focusKey)
}
