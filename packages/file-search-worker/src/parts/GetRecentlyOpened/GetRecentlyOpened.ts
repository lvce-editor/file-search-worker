import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const getRecentlyOpened = (): Promise<readonly string[]> => {
  return Rpc.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
}
