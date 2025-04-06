import type { Dirent } from '../Dirent/Dirent.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as GetFileIconsCached from '../GetFileIconsCached/GetFileIconsCached.ts'
import * as GetMissingIconRequests from '../GetMissingIconRequests/GetMissingIconRequests.ts'
import * as RequestFileIcons from '../RequestFileIcons/RequestFileIcons.ts'
import * as UpdateIconCache from '../UpdateIconCache/UpdateIconCache.ts'

const getPath = (dirent: Dirent): string => {
  return dirent.path
}

export const getQuickPickFileIcons = async (
  items: readonly ProtoVisibleItem[],
  fileIconCache: FileIconCache,
): Promise<{
  icons: readonly string[]
  newFileIconCache: FileIconCache
}> => {
  const dirents = items.map((item) => {
    const dirent: Dirent = {
      type: item.direntType,
      name: item.label,
      path: item.uri,
    }
    return dirent
  })
  const missingRequests = GetMissingIconRequests.getMissingIconRequests(dirents, fileIconCache)
  const newIcons = await RequestFileIcons.requestFileIcons(missingRequests)
  const newFileIconCache = UpdateIconCache.updateIconCache(fileIconCache, missingRequests, newIcons)
  const paths = dirents.map(getPath)
  const icons = GetFileIconsCached.getIconsCached(paths, newFileIconCache)
  return {
    icons,
    newFileIconCache,
  }
}
