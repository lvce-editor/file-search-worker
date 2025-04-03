import type { Dirent } from '../Dirent/Dirent.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import * as GetFileIconsCached from '../GetFileIconsCached/GetFileIconsCached.ts'
import * as GetMissingIconRequests from '../GetMissingIconRequests/GetMissingIconRequests.ts'
import * as RequestFileIcons from '../RequestFileIcons/RequestFileIcons.ts'
import * as UpdateIconCache from '../UpdateIconCache/UpdateIconCache.ts'

export const getFileIcons = async (
  files: readonly Dirent[],
  fileIconCache: FileIconCache,
): Promise<{
  icons: readonly string[]
  newFileIconCache: FileIconCache
}> => {
  const missingRequests = GetMissingIconRequests.getMissingIconRequests(files, fileIconCache)
  const newIcons = await RequestFileIcons.requestFileIcons(missingRequests)
  const newFileIconCache = UpdateIconCache.updateIconCache(fileIconCache, missingRequests, newIcons)
  const paths = files.map((file) => file.path)
  const icons = GetFileIconsCached.getIconsCached(paths, newFileIconCache)
  return {
    icons,
    newFileIconCache,
  }
}
