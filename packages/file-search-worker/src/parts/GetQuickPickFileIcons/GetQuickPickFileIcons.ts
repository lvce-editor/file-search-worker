import type { Dirent } from '../Dirent/Dirent.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import * as GetFileIconsCached from '../GetFileIconsCached/GetFileIconsCached.ts'
import * as GetMissingIconRequests from '../GetMissingIconRequests/GetMissingIconRequests.ts'
import * as RequestFileIcons from '../RequestFileIcons/RequestFileIcons.ts'
import * as UpdateIconCache from '../UpdateIconCache/UpdateIconCache.ts'

const emptyDirent: Dirent = {
  name: '',
  path: '',
  type: 0,
}

export const getQuickPickFileIcons = async (
  provider: QuickPickEntriesModule,
  items: readonly any[],
  fileIconCache: FileIconCache,
): Promise<{
  icons: readonly string[]
  newFileIconCache: FileIconCache
}> => {
  const dirents = items.map((item) => {
    const dirent = provider.getPickFileIcon?.(item) || emptyDirent
    return dirent
  })
  const missingRequests = GetMissingIconRequests.getMissingIconRequests(dirents, fileIconCache)
  const newIcons = await RequestFileIcons.requestFileIcons(missingRequests)
  const newFileIconCache = UpdateIconCache.updateIconCache(fileIconCache, missingRequests, newIcons)
  const paths = dirents.map((file) => file.path)
  const icons = GetFileIconsCached.getIconsCached(paths, newFileIconCache)
  return {
    icons,
    newFileIconCache,
  }
}
