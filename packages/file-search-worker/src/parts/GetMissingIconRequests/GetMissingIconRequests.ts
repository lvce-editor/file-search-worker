import type { Dirent } from '../Dirent/Dirent.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'
import * as DirentType from '../DirentType/DirentType.ts'

export const getMissingIconRequests = (dirents: readonly Dirent[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests: IconRequest[] = []

  for (const dirent of dirents) {
    if (!(dirent.path in fileIconCache)) {
      missingRequests.push({
        type: DirentType.File,
        name: dirent.name,
        path: dirent.path,
      })
    }
  }

  return missingRequests
}
