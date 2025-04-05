import * as GetRecentlyOpened from '../GetRecentlyOpened/GetRecentlyOpened.ts'

export const getPicks = async (): Promise<readonly string[]> => {
  const recentlyOpened = await GetRecentlyOpened.getRecentlyOpened()
  return recentlyOpened
}
