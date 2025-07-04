import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getRecentlyOpened = (): Promise<readonly string[]> => {
  return RendererWorker.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
}
