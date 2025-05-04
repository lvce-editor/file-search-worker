import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const getRecentlyOpened = (): Promise<readonly string[]> => {
  return Rpc.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
}
