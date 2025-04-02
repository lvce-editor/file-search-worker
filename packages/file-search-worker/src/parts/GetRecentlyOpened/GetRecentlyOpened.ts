import * as Rpc from '../Rpc/Rpc.ts'

export const getRecentlyOpened = (): Promise<readonly string[]> => {
  return Rpc.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
}
